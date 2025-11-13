import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { ReciepeCard } from "../components/ReciepeCard";
import { readRecipe } from "../MyBackend";
import { HomeBar } from "../components/HomeBar";

export const Recipes = () => {
  const [recipes,setRecipes] = useState([])
  const navigate = useNavigate();
  const [loading,setLoading] = useState(null)
  useEffect(()=>{
    setLoading(true)
    readRecipe(setRecipes, setLoading)
  },[])

  
  console.log(recipes);
  
  return (
    <div className="recipes-root">
      <HomeBar/>
      {loading && "alma"}

      <main className="recipes-content">

        {
          recipes ? recipes.map((obj,index)=>
            <ReciepeCard key={obj.id} id={obj.id} imgUrl={obj.imgUrl} name={obj.name} ingredients={obj.ingredients} steps={obj.steps}/>
          ):
           <p className="recipes-empty">Még nincsenek receptjeid. Kattints az alábbi gombra, hogy hozzáadj egyet!</p>

        }
       
      </main>

      <button className="recipes-add-btn" onClick={() => navigate('/addNew')} >
        <FaPlus /> Új recept hozzáadása
      </button>

    </div>
  );
};
