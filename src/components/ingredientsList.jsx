
export default function IngredientsList(props){


   const ingredientsList = props.ingredients.map(ingredient=><li key={ingredient}>{ingredient}</li>)

    return(
        <section>
            <h2>Ingredients On Hand :</h2>
            <ul className="ingredients-list">
                {ingredientsList}
            </ul>

            { ingredientsList.length > 4 &&

            <div className="get-recipe">
                <div >
                    <h3>Ready For A recipe ?</h3>
                    <p>Generate A Recipe From Your List Of Ingredients</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div> }

            

        </section>
    )
}