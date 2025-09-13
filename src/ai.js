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
      // Try to get the error message from the response body
      const errorData = await response.json().catch(() => null);
      if (errorData && errorData.error) {
        throw new Error(errorData.error);
      }
      // Fallback for generic HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return `### ⚠️ Unable to generate recipe.\n\n**Details:** ${error.message}`;
  }
}