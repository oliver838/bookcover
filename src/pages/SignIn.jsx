import React from 'react';
import { useNavigate } from 'react-router';
import { HomeBar } from '../components/HomeBar';
import { MyUserContext } from '../context/MyUserProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import { MyToastify } from '../components/MyToastify';

export const SignIn = () => {
   
    const navigate = useNavigate()
    const {signInUser,msg,setMsg} = useContext(MyUserContext)
    const handleSubmit=(event)=>{
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      console.log(data.get('email'),data.get('password'));
      signInUser(data.get('email'),data.get('password'));
    }
    useEffect(()=>{

      msg && msg?.signIn && navigate('/recipes') 
    },[msg])
      useEffect(()=>{
    console.log("barack");
    
    setMsg({})
  },[])
    return (
    <div className="signin-root">
      {msg && <MyToastify {...msg}/>}
        <HomeBar/>
      <div className="signin-card">
        <h1 className="signin-title">Bejelentkezés</h1>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-field">
            <label>Email</label>
            <input name='email' type="email" placeholder="Add meg az email címed" className="signin-input" />
          </div>

          <div className="signin-field">
            <label>Jelszó</label>
            <input name='password' type="password" placeholder="Írd be a jelszavad" className="signin-input" />
          </div>

          <button type="submit" className="signin-btn">Belépés</button>
        </form>

        <p className="signin-footer">
          Nincs még fiókod? <span onClick={(()=>navigate("/signUp"))}className="signin-link">Regisztrálj!</span>
        </p>
        <p className="signin-footer">
          Elfelejtetted a jelszód? <span onClick={(()=>navigate("/pwReset"))}className="signin-link">Kattints!</span>
        </p>
        {/* {msg && msg?.err && <p style={{color:'red'}}>{msg.err}</p>} */}
        
      </div>
    </div>
  );
};
