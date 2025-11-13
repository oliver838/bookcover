import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { MyToastify } from './MyToastify'
import { HomeBar } from './HomeBar'
import { useNavigate } from 'react-router'

export const PwReset = () => {
        const navigate = useNavigate()
    const {resetPassword,msg} = useContext(MyUserContext)
    const handleSubmit=async(event)=>{
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      console.log(data.get('email'),data.get('password'));
      await resetPassword(data.get('email'));
    }
  return (
<div className="signin-root">
      {msg && <MyToastify {...msg}/>}
        <HomeBar/>
      <div className="signin-card">
        <h1 className="signin-title">Jelszó visszaállítás</h1>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-field">
            <label>Email</label>
            <input name='email' type="email" placeholder="Add meg az email címed" className="signin-input" />
          </div>

          <button type="submit" className="signin-btn">Visszaállítás!</button>
        </form>


        {/* {msg && msg?.err && <p style={{color:'red'}}>{msg.err}</p>} */}
        
      </div>
    </div>
  )
}
