import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {jwtDecode } from "jwt-decode";
import Menu from "./Menu";

function Header({token,btnHandler}) {
  const [letterEmail,setLetterEmail] = useState("")
  const [bgColor,setBgColor] = useState("255")
  const [email,setEmail] = useState("")
  const [open,setOpen] = useState(false)

  const stringToColor = function stringToColor(str) {
    var hash = 0;
    var color = '#';
    var i;
    var value;
    var strLength;

    if(!str) {
        return color + '333333';
    }

    strLength = str.length;

    for (i = 0; i < strLength; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
};


const openHandler = () =>{
  setOpen(!open)
}

useEffect(() =>{
  if (token){
    const decode = jwtDecode(token)
    const emailDecode = decode.email
    setEmail(emailDecode)
    const letter = emailDecode.slice(0,1)
    const backgroundColor = stringToColor(letter);
    setLetterEmail(letter)
    setBgColor(backgroundColor)
  }
},[token])


  return (
    <header className="bg-amber-800 pb-1">
      <ul className="flex justify-between p-2 text-xl">
        <li className="p-2 text-sky-200 hover:scale-110  hover:cursor-pointer hover:transition-all">
          <Link to="/">Главное Меню</Link>
        </li>
        <li className="p-2 text-sky-200 hover:scale-110 hover:cursor-pointer hover:transition-all">
          <Link to="/add">Добавить</Link>
        </li>
        {token ? (
          <li className="relative" onClick={openHandler}>
            <div className="rounded-full w-15 h-15 cursor-pointer" style={{
              backgroundColor:bgColor
            }}>
              <p className="flex justify-center items-center h-13 text-white ">{letterEmail}</p>
            </div>
            {open &&(
              <Menu email={email} btnHandler={btnHandler}/>
            )}
          </li>
        ) : (
          <li className="p-2 text-sky-200 hover:scale-110 hover:cursor-pointer hover:transition-all">
            <Link to="/login">Авторизация</Link>
          </li>
        )}
      </ul>
    </header>

  );
}

export default Header;
