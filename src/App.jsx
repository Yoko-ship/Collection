import './App.css'
import { HashRouter as Router,Route,Routes,} from 'react-router-dom'
import Header from './components/Header'
import Form from './components/Form'
import Login from './components/Login'
import Register from './components/Register'
import { useEffect, useState } from 'react'
import Main from './components/Main'



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

  const handleMessages = () =>{
    setError("")
    setSuccess("")
  }

  const clearFunction = ({value1,value2,value3,value4} = {}) =>{
    value1("")
    value2("")
    value3("")
  }


  return (
    <>
    <Router>
      <Header token={tokens} btnHandler={leaveButton} handleMessages={handleMessages}/>
      <Routes>
        <Route element={<Main token={tokens}/>} path='/'></Route>
        <Route element={<Form token={tokens} setSuccess={setSuccess} success={success} setError={setError} error={error} clearFunction={clearFunction}/>} path='/add'></Route>
        <Route element={<Login setToken={setTokens} error={error} setError={setError} success={success} setSuccess={setSuccess} clearFunction={clearFunction}/>} path='/login'></Route>
        <Route element={<Register setError={setError} error={error} setSuccess={setSuccess} success={success} clearFunction={clearFunction}/>} path='/register'></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
