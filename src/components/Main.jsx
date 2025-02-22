import React, { useEffect, useState } from "react";
import axios from "axios";

function Main({ token }) {
    const [values,setValues] = useState([])
  const getValues = () => {
    if (token){
        axios
        .get("http://localhost:3000/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setValues(response.data)
        })
        .catch((err) => {
          console.log(err.response ? err.response.data : err.message);
        });
    }

  };

  useEffect(() => {
    getValues()
  }, [token]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"> 
      {values.map((value,index) =>(
        <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Имя:{value.name}</h3>
            <p className="text-gray-300">Рейтинг:{value.rating}</p>
            <p className="text-gray-300">Категория:{value.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Main;
