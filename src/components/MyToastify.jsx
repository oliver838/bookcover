import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'
import { PwReset } from './PwReset'

export const MyToastify = ({err, signUp,resetPw}) => {
    const  {setMsg} = useContext(MyUserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(signUp);
        
        if(err){
            toast.error(err,{position:'top-center'})
            setMsg({})
        }if(signUp){
            console.log(signUp,signUp);
            
            navigate('/signIn')
            toast.success(signUp,{position:'top-center'})
        
        }
        if(resetPw){
            console.log(PwReset,signUp);
            
            navigate('/signIn')
            toast.success(resetPw,{position:'top-center'})
        }
    },[err,signUp,resetPw])
  return (
    <div>
        <ToastContainer/>
    </div>
  )
}