import React from "react"
import IngredientsList from "./components/ingredientsList"
import MistralRecipe from "./components/MistralRecipe" 
import { generatedRecipe } from "./ai.js"

export default function MainSection(){

    const [ingredients,setIngredients]=React.useState([])

    const [recipe,setRecipe] =React.useState("")

    const[loading,setLoading]=React.useState(false)

    async function getRecipe(){
        setLoading(true)
        const recipeFromAI=  await generatedRecipe(ingredients)
        setRecipe(recipeFromAI)
        setLoading(false)
    }

    function addIngredient(formData){
        const  newIngredient = formData.get("ingredient")
        setIngredients(
            prevIngredients =>[...prevIngredients, newIngredient]
        )
        
    }

    function startOver(){
        window.location.reload()
    }

   




    return (
        <main>
          
          <form action={addIngredient}   className="add-ingredient-form">
                < input
                 name="ingredient"
                 type="text"
                 placeholder="e.g. Oregano" 
                 aria-label="Add Ingredient" />

                <button> Add Ingredient </button>
          </form>

        
            { ingredients.length > 0 && 
             <IngredientsList 
             ingredients={ingredients}
             getRecipe={getRecipe}
             />
            }

            { loading && <div className="loading-message">👨‍🍳 Chef Mistral is preparing your recipe...</div>}

            {recipe && <MistralRecipe recipe={recipe} startOver={startOver}/>}




        </main>
    )
}