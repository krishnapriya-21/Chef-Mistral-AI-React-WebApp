import ReactMarkdown from "react-markdown"

export default function MistralRecipe (props){
    return(
       
       <section className="suggested-recipe">
          
             <h2>Chef Mistral Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown> 
           <button type="button" onClick={props.startOver}>Start Over </button>
        </section>
    )
}