import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = (props) => {

  const [idRecipe, setIdRecipe] = useState(null);
  const [modalRecipe, saveModalRecipe] = useState({})

  useEffect( () => {
    const getIdRecipe = async () => {

      if( !idRecipe ) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ idRecipe }`

      const result = await axios.get(url);
      saveModalRecipe(result.data.drinks[0]);
    }
    getIdRecipe()
  }, [ idRecipe ])

  return (
    <ModalContext.Provider
      value={{
        modalRecipe,
        setIdRecipe,
        saveModalRecipe
      }}
    >
      {
        props.children
      }
    </ModalContext.Provider>
  )
}

export default ModalProvider;