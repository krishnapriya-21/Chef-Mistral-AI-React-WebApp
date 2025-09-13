import { InferenceClient } from "@huggingface/inference";

const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The model ID and Hugging Face client are defined outside the handler
// to allow for potential reuse across function invocations.
const MODEL_ID = "llama3-8b-8192";
// The InferenceClient can be used with any OpenAI-compatible API, like Groq.
// We pass the Groq API key and the custom endpoint URL.
const hf = new InferenceClient(process.env.GROQ_API_KEY, {
  endpoint: "https://api.groq.com/openai/v1",
});

// This function is the main handler for the Vercel serverless function.
// It's an async function that takes a request and response object.
export default async function handler(request, response) {
  // Vercel automatically parses the body for POST requests
  const { ingredientsList } = request.body;

  if (!ingredientsList || !Array.isArray(ingredientsList)) {
    return response.status(400).json({ error: "ingredientsList is required" });
  }

  const ingredients = ingredientsList.join(", ");
  const prompt = `
  You are an expert chef. Create a recipe using only the following ingredients: ${ingredients}.
  Your response must be in Markdown format.
  The recipe should include the following sections:
  - A creative "Recipe Title".
  - A "Description" of the dish.
  - A list of "Ingredients".
  - A numbered list of "Instructions".
  `;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const recipeResponse = await hf.chatCompletion({
        model: MODEL_ID,
        messages: [{ role: "user", content: prompt }],
        parameters: { max_new_tokens: 1024 },
      });

      const recipe = recipeResponse.choices[0].message.content;
      return response.status(200).json({ recipe });
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (i < MAX_RETRIES - 1) {
        // Wait for a second before retrying
        await sleep(1000);
      } else {
        // If all retries fail, return the final error
        console.error("All retries failed. Error generating recipe:", error);
        // Pass the actual error message to the frontend for better debugging
        const errorMessage = error.message || "An unknown error occurred with the model.";
        return response.status(500).json({ error: `Failed to generate recipe: ${errorMessage}` });
      }
    }
  }
}
