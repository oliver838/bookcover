import React, { useRef, useState } from "react";
import { FaHome, FaPlus, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router";
import { addRecipe } from "../MyBackend";


// ---------- Home komponens (modern stílus) ----------
export const Home = () => {
const navigate = useNavigate();


return (
<div className="home-root">
<div className="home-hero">
<div className="home-hero-left">
<h1 className="home-title">RecipeBook</h1>
<p className="home-sub">Főzz, posztolj, inspirálj — oszd meg a legjobb receptjeidet a közösséggel!</p>


<div className="home-cta">
<button className="home-btn-primary" onClick={() => navigate('/recipes')}>
<FaUtensils /> Nézd meg a recepteket
</button>


<button className="home-btn-ghost" onClick={() => navigate('/addNew')}>
<FaPlus /> Új recept hozzáadása
</button>
</div>
</div>


<div className="home-hero-right" aria-hidden>
<div className="home-card">
<div className="home-card-inner">
<div className="home-card-title">Mai ajánlat</div>
<div className="home-card-recipe">Csirke paradicsomos szósszal</div>
</div>
</div>
</div>
</div>


</div>
);
};