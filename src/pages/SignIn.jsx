import React from 'react';
import { useNavigate } from 'react-router';
import { HomeBar } from '../components/HomeBar';

export const SignIn = () => {
    const navigate = useNavigate()
    return (
    <div className="signin-root">
        <HomeBar/>
      <div className="signin-card">
        <h1 className="signin-title">Bejelentkezés</h1>

        <form className="signin-form">
          <div className="signin-field">
            <label>Email</label>
            <input type="email" placeholder="Add meg az email címed" className="signin-input" />
          </div>

          <div className="signin-field">
            <label>Jelszó</label>
            <input type="password" placeholder="Írd be a jelszavad" className="signin-input" />
          </div>

          <button type="submit" className="signin-btn">Belépés</button>
        </form>

        <p className="signin-footer">
          Nincs még fiókod? <span onClick={()=>navigate("/signUp")} href="/signUp" className="signin-link">Regisztrálj!</span>
        </p>
      </div>
    </div>
  );
};
