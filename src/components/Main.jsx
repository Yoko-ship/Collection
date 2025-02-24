import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: null, label: "Все" },
  { value: "Игра", label: "Игра" },
  { value: "Фильм", label: "Фильм" },
  { value: "Сериал", label: "Сериал" },
  { value: "Аниме", label: "Аниме" },
];

function Main({ token,setTokens}) {
  const [values, setValues] = useState([]);
  const [category, setCategory] = useState("");

  const getValues = () => {
    if (token) {
      axios
        .get("http://localhost:3000/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setValues(response.data);
        })
        .catch((err) => {
          const errorMessage = err.response ? err.response.data : err.message
          if(errorMessage.error === "❌ Нужно войти в аккаунт"){
            localStorage.removeItem("token")
            setTokens("")
          }
        });
    }
  };

  const fetchBlogs = async () => {
    try {
      const url = category
        ? `http://localhost:3000/?category=${category}`
        : "http://localhost:3000/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setValues(response.data);
    } catch {
      console.log("Данные отстуствуют");
    }
  };

  const deleteButton = (id) => {
    axios
      .post("http://localhost:3000/delete", { id })
      .then((response) => {
        const updatedElements = values.filter((value) => value.id !== id);
        setValues(updatedElements);
        console.log(response.data);
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data : err.message
        console.log(errorMessage.error)
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  useEffect(() => {
    getValues();
  }, [token]);
  return (
    <>
    <div className="flex justify-center p-5">
    <Select
          onChange={(e) => setCategory(e.value)}
          options={options}
          placeholder="Поиск по категориям"
        ></Select>
    </div>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {values.map((value, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-white">
              Имя:{value.name}
            </h3>
            <p className="text-gray-300">Рейтинг:{value.rating}</p>
            <p className="text-gray-300">Категория:{value.category}</p>
            <div className="pt-3">
              <button
                className="bg-red-600 text-white p-2 rounded-xl"
                onClick={() => deleteButton(value.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
