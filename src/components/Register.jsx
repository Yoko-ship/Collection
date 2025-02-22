import React from "react";
import Inputs from "./Inputs";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const buttonHandler = (e) => {
    e.preventDefault();
    if (password.length >= 8 && /[a-zA-Z]/.test(password)) {
      axios
        .post("http://localhost:3000/register", { name, email, password })
        .then((response) => {
          console.log("Регистрация прошла успешно", response.data);
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setSuccess("Регистрация прошла успешно");
        })
        .catch((err) => {
          setError(err.response ? err.response.data : err.message);
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
      <form className="flex flex-col items-center">
        <Inputs name={"Имя"} type={"text"} getValue={setName} value={name}/>
        <Inputs name={"Почта"} type={"email"} getValue={setEmail} value={email} />
        <Inputs name={"Пароль"} type={"password"} getValue={setPassword} value={password}/>
        <div className="p-5">
          <button
            className="bg-green-900 text-white p-2 rounded-xl cursor-pointer"
            onClick={(e) => buttonHandler(e)}
          >
            Регистрация
          </button>
        </div>
        {error && (
          <div>
            <p className="text-red-600 text-xl">{error}</p>
          </div>
        )}
        {success && (
          <div>
            <p className="text-green-700 text-xl">{success}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
