import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext()

const CategoriesProvider = (props) => {

  const [categories, setCategories] = useState([]);

  useEffect( () => {
    const getCategories = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const result = await axios.get(url);
      setCategories(result.data.drinks);      
    }

    getCategories()
    
  }, [])

  return (
    <CategoriesContext.Provider
      value={{
        categories
      }}
    >
      { props.children }
    </CategoriesContext.Provider>
  )
} 

export default CategoriesProvider