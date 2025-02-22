import React, { useEffect, useState } from "react";
import Inputs from "./Inputs";
import Select from "react-select";
import axios from "axios";
import Messages from "./Messages";

function Form({token,setSuccess,success,setError,error}) {
  const options = [
    { value: "Игра", label: "Игра" },
    { value: "Фильм", label: "Фильм" },
    { value: "Сериал", label: "Сериал" },
    { value: "Аниме", label: "Аниме" },
  ];

  const [nameValue, setNameValue] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");

  const clearFunction = () =>{
    setNameValue("")
    setRating("")
    setCategory("")
    setError("")
  }

  const buttonHandler = async() => {
    axios.post("http://localhost:3000/add",{nameValue,rating,category},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((response) =>{
      setSuccess("Данные успешно переданы")
      clearFunction()
    })
    .catch((err) =>{
      setError(err.response ? err.response.data : err.message)
      setSuccess("")
    })
  };


  return (
    <div>
      <form className="flex items-center flex-col">
        <Inputs name={"Названия"} type={"text"} getValue={setNameValue} value={nameValue} />
        <Inputs name={"Рейтинг"} type={"number"} getValue={setRating} value={rating}/>
        <Select
          options={options}
          className="text-2xl  pt-3 w-1/4 "
          placeholder="Категория"
          onChange={(e) => setCategory(e.value)}
        />
        <div className="p-3">
          <button
            type="button"
            className="bg-green-800 text-white p-3 cursor-pointer rounded-xl"
            onClick={buttonHandler}
          >
            Подтвердит
          </button>
        </div>
      </form>

      <Messages error={error} success={success}/>
    </div>
  );
}

export default Form;
