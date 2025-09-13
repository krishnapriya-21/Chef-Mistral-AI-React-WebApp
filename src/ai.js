export async function generatedRecipe(ingredientsList) {
  try {
    // Call our new serverless function
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredientsList }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "### ⚠️ Unable to generate recipe. Please try again.";
  }
}