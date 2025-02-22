import React, { useEffect } from "react";
import Inputs from "./Inputs";
import { useState } from "react";
import axios from "axios";
import FormElement from "./FormElement";
import Messages from "./Messages";

function Register({error,success,setSuccess,setError,clearFunction}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonHandler = (e) => {
    e.preventDefault();
    if (password.length >= 8 && /[a-zA-Z]/.test(password)) {
      axios
        .post("http://localhost:3000/register", { name, email, password })
        .then((response) => {
          setSuccess("Регистрация прошла успешно");
          clearFunction({value1:setName,value2:setEmail,value3:setPassword,value4:setError})
        })
        .catch((err) => {
          const text = err.response ? err.response.data : err.message
          setError(text.error);
          setSuccess("");
        });
    } else {
      setError(
        "Пароль должен быть не короче 8 символов и обязательно содержать хотя бы одну букву на английском."
      );
      setSuccess("");
    }
  };
  return (
    <div>
      <FormElement buttonHandler={buttonHandler}>
        <Inputs name={"Имя"} type={"text"} getValue={setName} value={name}/>
        <Inputs name={"Почта"} type={"email"} getValue={setEmail} value={email} />
        <Inputs name={"Пароль"} type={"password"} getValue={setPassword} value={password}/>
      </FormElement>

      <Messages success={success} error={error}/>
    </div>
  
  );
}

export default Register;
