import { InferenceClient } from "@huggingface/inference";

const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2";
// The token is now a true environment variable on the server, not exposed to the client
const hf = new InferenceClient(process.env.HF_TOKEN);

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

  try {
    const recipeResponse = await hf.chatCompletion({
      model: MODEL_ID,
      messages: [{ role: "user", content: prompt }],
      parameters: { max_new_tokens: 1024 },
    });

    const recipe = recipeResponse.choices[0].message.content;
    return response.status(200).json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return response.status(500).json({ error: "Failed to generate recipe" });
  }
}
