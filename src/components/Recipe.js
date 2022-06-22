import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  width: 450,
  maxHeight: 550,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',  
  display: 'block',
}

export const Recipe = ({ recipe }) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { modalRecipe, setIdRecipe, saveModalRecipe } = useContext(ModalContext);
  console.log(modalRecipe);

  const showIngredients = modalRecipe => {
    let ingredients = [];
    for( let i = 1; i < 16; i++ ) {
      if( modalRecipe[`strIngredient${i}`] ) {
        ingredients.push(
          <li
            key={modalRecipe[`strIngredient${i}`]}
          >
            { modalRecipe[`strIngredient${i}`] } - { modalRecipe[`strMeasure${i}`] }
          </li>
        )
      }
    }
    return ingredients;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        
        <h2 className="card-header text-center">{ recipe.strDrink }</h2>
        <img 
          className="card-img-top" 
          src={ recipe.strDrinkThumb } 
          alt={`imagen de ${ recipe.strDrink }`} 
        />
        <div className="card-body d-grid">
          <button 
            type="button"
            className="btn btn-danger"
            onClick={ () => {
              setIdRecipe(recipe.idDrink);
              handleOpen(true);
            }}
          >
            See More Details
          </button>
          <Modal
            open={ open }
            onClose={ () => {
              handleClose();
              setIdRecipe(null);
              saveModalRecipe({})
            } }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <h2 className="text-center">{ modalRecipe.strDrink }</h2>
            <hr />
            <h3 className="mt-3">Instructions</h3>
            <p className="mt-2">{ modalRecipe.strInstructions }</p>
            <img className="img-fluid my-3" src={ modalRecipe.strDrinkThumb } alt={`Imagen de ${ modalRecipe.strDrink }`} />

            <h3>Ingredients and Quantities</h3>
            <ul>
              { showIngredients( modalRecipe ) }
            </ul>
          </Box>
            
          </Modal>
        </div>

      </div>
    </div>
  )
}
