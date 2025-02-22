import React, { useState } from "react";
import Inputs from "./Inputs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./Messages";

function Login({setToken,error,setError,success,setSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const clearFunction = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const navigate = useNavigate();
  const buttonHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/logIn", { email, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token)
        setSuccess("Вы успешно вошли в свой аккаунт")
        clearFunction();
        navigate("/");
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message);
      });
  };

  return (
    <div>
      <form className="flex flex-col items-center">
        <Inputs
          name={"Почта"}
          type={"email"}
          getValue={setEmail}
          value={email}
        />
        <Inputs
          name={"Пароль"}
          type={"password"}
          getValue={setPassword}
          value={password}
        />
        <div className="p-5">
          <button
            className="bg-green-900 text-white p-2 rounded-xl cursor-pointer"
            onClick={(e) => buttonHandler(e)}
          >
            Авторизация
          </button>
        </div>
      </form>
      <div className=" w-40 m-auto ">
        <p className="p-2 text-center hover:scale-110 transition-all">
          <Link className="text-2xl text-blue-400" to={"/register"}>
            Регистрация
          </Link>
        </p>
      </div>
      <Messages error={error} success={success}/>
    </div>
  );
}

export default Login;
