import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {jwtDecode } from "jwt-decode";
import Menu from "./Menu";
import LiElements from "./LiElements";

function Header({token,btnHandler,handleMessages}) {
  const [letterEmail,setLetterEmail] = useState("")
  const [bgColor,setBgColor] = useState("")
  const [email,setEmail] = useState("")
  const [open,setOpen] = useState(false)


  //* Генерация цветных аватарок
  const stringToColor = (str = '') => {
    if (!str) return '#333333';

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    }

    hash = (hash ^ (hash >> 16)) * 0x45d9f3b;
    hash = (hash ^ (hash >> 16)) * 0x45d9f3b;
    hash = hash ^ (hash >> 16);

    let r = (hash >> 16) & 0xFF;
    let g = (hash >> 8) & 0xFF;
    let b = hash & 0xFF;

    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
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
      <ul className="flex justify-between p-2 text-xl " onClick={handleMessages}>
        <LiElements name={"Главное меню"} path={"/"}/>
        <LiElements name={"Добавить"} path={"/add"}/>
        {token ? (
          <li className="" onClick={openHandler}>
            <div className="rounded-full w-15 h-15 cursor-pointer " style={{
              backgroundColor:bgColor
            }}>
              <p className="flex justify-center items-center h-13 text-white ">{letterEmail}</p>
            </div>
            {open &&(
              <Menu email={email} btnHandler={btnHandler}/>
            )}
          </li>
        ) : (
          <LiElements name={"Авторизация"} path={"/login"}/>
        )}
      </ul>
    </header>

  );
}

export default Header;
