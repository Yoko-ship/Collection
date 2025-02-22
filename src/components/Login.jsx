import React, { useState } from "react";
import Inputs from "./Inputs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./Messages";
import FormElement from "./FormElement";

function Login({setToken,error,setError,success,setSuccess,clearFunction}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        clearFunction({value1:setEmail,value2:setPassword,value3:setError});
        navigate("/");
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message);
      });
  };

  return (
    <div>
      <FormElement buttonHandler={buttonHandler}>
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
      </FormElement>
      <div className=" w-40 m-auto ">
        <p className="p-2 text-center hover:scale-110 transition-all" onClick={() => setError("")}>
          <Link className="text-2xl text-blue-400" to={"/register"}>
            Регистрация
          </Link>
        </p>
      </div>
      <Messages error={error.error} success={success}/>
    </div>
  );
}

export default Login;
