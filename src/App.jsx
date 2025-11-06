import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { Recipes } from './pages/Recipes'
import { RecipesForm } from './pages/RecipesForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/addNew' element={<RecipesForm/>}/>
      <Route path='/edit/:id' element={<RecipesForm/>}/>
    </Routes>
  )
}

export default App
