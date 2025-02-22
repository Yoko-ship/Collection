import './App.css'
import { HashRouter as Router,Route,Routes,} from 'react-router-dom'
import Header from './components/Header'
import Collections from './components/Collections'
import Form from './components/Form'
import Login from './components/Login'
import Register from './components/Register'
import { useEffect, useState } from 'react'



function App() {
  const [tokens,setTokens] = useState("")
  const [error,setError ] = useState("")
  const [success,setSuccess] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokens(storedToken);
    }
  }, []);
  
  const leaveButton = () =>{
    localStorage.removeItem("token")
    setTokens("")
  }



  return (
    <>
    <Router>
      <Header token={tokens} btnHandler={leaveButton}/>
      <Routes>
        <Route element={<Collections/>} path='/'></Route>
        <Route element={<Form token={tokens} setSuccess={setSuccess} success={success} setError={setError} error={error}/>} path='/add'></Route>
        <Route element={<Login setToken={setTokens} error={error} setError={setError} success={success} setSuccess={setSuccess}/>} path='/login'></Route>
        <Route element={<Register/>} path='/register'></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
