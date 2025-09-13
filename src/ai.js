import { InferenceClient } from '@huggingface/inference';

const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2";
const hf = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

export async function generatedRecipe(ingredientsList) {
  const ingredients = ingredientsList.join(", ");
  const prompt = `I have ${ingredients}. Please give me a recipe you'd recommend I make!`;

  try {
    const response = await hf.chatCompletion({
      model: MODEL_ID,
      messages: [{ role: "user", content: prompt }],
      parameters: {
        max_new_tokens: 1024,
      },
    });

    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "### ⚠️ Unable to generate recipe. Please try again.";
  }
}