import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const RecipesContext = createContext()

const RecipesProvider = (props) => {

  const [recipes, saveRecipes ] = useState([])
  const [search, searchRecipes] = useState({
    ingredient: '',
    category: ''
  });

  const [consult, setConsult] = useState(false)

  const { ingredient, category } = search

  useEffect( () => {
    if( consult ) {
      const getRecipes = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ ingredient }&c=${ category }`;

        const result = await axios.get(url);
        saveRecipes(result.data.drinks);
      }
      getRecipes() 
    }

  }, [search])

  
  return (
    <RecipesContext.Provider
      value={{
        recipes,
        searchRecipes,
        setConsult
      }}
    >
      { props.children }
    </RecipesContext.Provider>
  )
}

export default RecipesProvider


// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';


// export const RecipesContext = createContext();

// const RecipesProvider = (props) => {

//     const [recipes, saveRecipes] = useState([]);
//     const [search, searchRecipes] = useState({
//         ingredient: '',
//         category: ''
//     });
//     const [ consult, setConsult] = useState(false);

//     const { ingredient, category} = search;

//     useEffect(() => {
//         if(consult) {
//             const getRecipes = async () => {
//                 const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;

//                 const resultado = await axios.get(url);

//                 // console.log(resultado.data.drinks);
//                 saveRecipes(resultado.data.drinks);
//             }

//             getRecipes();
//         }

//     }, [search]);

//     return ( 
//         <RecipesContext.Provider
//             value={{
//                 recipes,
//                 searchRecipes, 
//                 saveRecipes
//             }}
//         >
//             {props.children}
//         </RecipesContext.Provider>
//      );
// }
 
// export default RecipesProvider;