import React from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

export const Recipes = () => {
  const navigate = useNavigate();

  return (
    <div className="recipes-root">
      <header className="recipes-header">
        <FaHome className="recipes-home" onClick={() => navigate('/')} aria-label="Vissza a főoldalra" />
        <h1 className="recipes-title">Receptek</h1>
      </header>

      <main className="recipes-content">
        <p className="recipes-empty">Még nincsenek receptjeid. Kattints az alábbi gombra, hogy hozzáadj egyet!</p>
      </main>

      <button className="recipes-add-btn" onClick={() => navigate('/addNew')}>
        <FaPlus /> Új recept hozzáadása
      </button>

    </div>
  );
};
