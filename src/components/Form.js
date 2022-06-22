import { useContext, useState } from "react"
import { CategoriesContext } from "../context/CategoriesContext"
import { RecipesContext } from "../context/RecipesContext"

export const Form = () => {

  const [search, setSearch] = useState({
    ingredient: '',
    category: ''    
  })

  const getRecipesData = e => {
    setSearch({
      ...search,
      [e.target.name] : e.target.value
    })
  }

  const { ingredient, category } = search

  const { categories } = useContext(CategoriesContext);
  const { searchRecipes, setConsult } = useContext(RecipesContext)

  return (
    <form 
      className='col-md-12'
      onSubmit={ e => {
        e.preventDefault();
        searchRecipes(search);
        setConsult(true);
      }}
    >
      <fieldset>
        <legend>Search Drinks for Ingredient or Category</legend>
      </fieldset>

      <div className="row">
        <div className="col-md-4">
          <input 
            name="ingredient"
            className="form-control"
            type="text" 
            placeholder="Search by Ingredient"
            onChange={ getRecipesData }
            value={ ingredient }
          />
        </div>
        <div className="col-md-4">
          <select 
            name="category"
            className="form-select"
            onChange={ getRecipesData }
            value={ category }
          >
            <option value="">-- Select Category --</option>
            { categories.map( ({ strCategory }) => (
              <option 
                key={ strCategory }
                value={ strCategory }
              >
                { strCategory }
              </option>
            )) }
          </select>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary w-75"
            type="submit"
          >
            Search Recipes
          </button>
        </div>
      </div>
    </form>
  )
}
