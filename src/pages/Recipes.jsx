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
  
  useEffect(()=>{
    readRecipe(setRecipes)
  },[])
  console.log(recipes);
  
  return (
    <div className="recipes-root">
      <HomeBar/>
      <header className="recipes-header">
        <FaHome className="recipes-home" onClick={() => navigate('/')} aria-label="Vissza a főoldalra" />
        <h1 className="recipes-title">Receptek</h1>
      </header>

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
