import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { deleteRecipe } from '../MyBackend'
import { useNavigate } from 'react-router'

export const ReciepeCard = ({ id, name, steps, ingredients, imgUrl, deleteUrl }) => {
  const navigate = useNavigate()

  return (
    <div className='recipe-card'>
      <img src={imgUrl} alt={name} />
      <h1>{name}</h1>

      <ul>
        <h4>Hozzávalók:</h4>
        {ingredients.map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul>

      <p>{steps}</p>

      <div className='recipe-card-icons'>
     
        <MdDeleteForever
          size={28}
          onClick={() => deleteRecipe(id, deleteUrl)}
          title="Törlés"
        />
        <CiEdit
          size={28}
          onClick={() => navigate('/edit/' + id)}
          title="Szerkesztés"
        />
      </div>
    </div>
  )
}
