import React, { useState, useRef } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import { addRecipe } from "../MyBackend";

export const RecipesForm = ()=> {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const inputData = { name, ingredients: ingredients.filter(i => i.trim() !== ""), steps, category };
      console.log("Submitting:", inputData);
      await addRecipe(inputData, file);
      console.log("Recept elmentve");
      // Optionally navigate back or clear form
      navigate("/recipes");
    } catch (err) {
      console.error(err);
      alert("Hiba történt a mentéskor.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeIngredients = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => setIngredients(prev => [...prev, ""]);
  const removeIngredient = (idx) => setIngredients(prev => prev.filter((_, i) => i !== idx));

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected || null);
    if (selected) setPreview(URL.createObjectURL(selected));
    else setPreview(null);
  };

  const triggerFile = () => fileInputRef.current?.click();

  return (
    <div className="rf-root">
      <form className="rf-card" onSubmit={handleSubmit} aria-label="Új recept feltöltése">
        <div className="rf-header">
          <h1>Új recept feltöltése</h1>
          <IoClose className="rf-close" onClick={() => navigate("/recipes")} aria-label="Bezárás" />
        </div>

        <div className="rf-grid">
          <div className="rf-column-left">
            <label className="rf-label">Recept neve</label>
            <input
              className="rf-input"
              type="text"
              placeholder="Pl.: Csirkés egytál"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="rf-label">Hozzávalók</label>
            <div className="rf-ingredients">
              {ingredients.map((item, index) => (
                <div className="rf-ingredient-row" key={index}>
                  <input
                    className="rf-input rf-input-ingredient"
                    type="text"
                    value={item}
                    onChange={(e) => handleChangeIngredients(index, e.target.value)}
                    placeholder={`#${index + 1} hozzávaló`}
                  />
                  <button
                    type="button"
                    className="rf-ingredient-remove"
                    onClick={() => removeIngredient(index)}
                    aria-label={`Törlés ${index + 1}`}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}

              <button type="button" className="rf-add-btn" onClick={addIngredient} aria-label="Új hozzávaló hozzáadása">
                <FaPlus /> <span>Hozzáadás</span>
              </button>
            </div>

            <label className="rf-label">Kategória</label>
            <input
              className="rf-input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Pl.: Leves / Főétel / Desszert"
              required
            />

            <label className="rf-label">Elkészítés</label>
            <textarea
              className="rf-textarea"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Lépésről lépésre írd le az elkészítést"
              required
            />

            <div className="rf-actions">
              <button className="rf-submit" type="submit" disabled={isLoading}>
                {isLoading ? <span className="rf-spinner" aria-hidden></span> : "Mentés"}
              </button>
              <button className="rf-cancel" type="button" onClick={() => navigate("/recipes")}>Mégse</button>
            </div>
          </div>

          <aside className="rf-column-right">
            <label className="rf-label">Kép</label>
            <div className="rf-image-uploader" onClick={triggerFile} role="button" tabIndex={0}>
              {preview ? (
                <img src={preview} alt="Előnézet" className="rf-preview" />
              ) : (
                <div className="rf-image-placeholder">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>Kép feltöltése</div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div className="rf-hint">Használj jó minőségű, arányos képet (pl. 4:3). A kép automatikusan feltöltődik a mentéskor.</div>
          </aside>
        </div>
      </form>

      {/* Scoped styles - a színpalettád változói alkalmazva */}

    </div>
  );
}
