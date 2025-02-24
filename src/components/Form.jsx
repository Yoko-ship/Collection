import React, { useEffect, useState } from "react";
import Inputs from "./Inputs";
import Select from "react-select";
import axios from "axios";
import Messages from "./Messages";
import FormElement from "./FormElement";

const options = [
  { value: "Игра", label: "Игра" },
  { value: "Фильм", label: "Фильм" },
  { value: "Сериал", label: "Сериал" },
  { value: "Аниме", label: "Аниме" },
];

function Form({ token, setSuccess, success, setError, error, clearFunction}) {
  const [nameValue, setNameValue] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState(null);
  const buttonHandler = async () => {
    const categoryValue = category.value
    axios
      .post(
        "http://localhost:3000/add",
        { nameValue, rating, categoryValue},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccess("Данные успешно переданы");
        clearFunction({
          value1: setNameValue,
          value2: setRating,
          value3: setCategory,
          value4: setError(""),
        });
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message);
        setSuccess("");
      });
  };



  return (
    <div>
      <FormElement buttonHandler={buttonHandler}>
        <Inputs
          name={"Названия"}
          type={"text"}
          getValue={setNameValue}
          value={nameValue}
        />
        <Inputs
          name={"Рейтинг"}
          type={"number"}
          getValue={setRating}
          value={rating}
        />
        <Select
          options={options}
          className="text-2xl  pt-3 w-1/4 "
          placeholder="Категория"
          defaultValue={category}
          onChange={setCategory}
          value={category}
          isClearable
        />
      </FormElement>
      <Messages error={error.error} success={success} />
    </div>
  );
}

export default Form;
