import React from 'react';
import { useNavigate } from 'react-router';
import { HomeBar } from '../components/HomeBar';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { useEffect } from 'react';

export const SignUp = () => {

    const navigate = useNavigate()
    const {signUpUser,msg,logOutUser,setMsg} = useContext(MyUserContext)
    const handleSubmit=(event)=>{
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      console.log(data.get('email'),data.get('password'),data.get('display_name'));
      signUpUser(data.get('email'),data.get('password'),data.get('display_name'))
      
    }
    useEffect(()=>{
      msg && msg?.signUp && navigate('/recipes')
    },[msg])
      useEffect(()=>{
    console.log("barack");
    
    setMsg({})
  },[])
  return (
    <div className="signup-root">
        
                <HomeBar/>
      <div className="signup-card">
        <h1 className="signup-title">Regisztrálás</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-field">
            <label>Email</label>
            <input name='email' type="email" placeholder="Add meg az email címed" className="signup-input" />
          </div>

          <div className="signup-field">
            <label>Jelszó</label>
            <input name='password' type="password" placeholder="Válassz egy jelszót" className="signup-input" />
          </div>
           
          {/* <div className="signup-field">
            <label>Jelszó megerősítése</label>
            <input name='password-copy' type="password" placeholder="Írd be újra a jelszót" className="signup-input" />
          </div> */}

          <div className="signup-field">
            <label>Felhasználónév</label>
            <input name='display_name' type="text" placeholder="Felhasználónév" className="signup-input" />
          </div>


          <button type="submit" className="signup-btn">Regisztrálok</button>
        </form>

        <p className="signup-footer">
          Van már fiókod? <span onClick={()=>navigate("/signIn")}  className="signup-link">Jelentkezz be!</span>
        </p>
        {msg && (msg?.err || msg?.signUp) && <p style={{color:'red'}}>{msg?.err || msg.signUp}</p>}
      </div>
    </div>
  );
};
