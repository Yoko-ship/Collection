import React from "react";
import { Link } from "react-router-dom";

function LiElements({name,path}) {
  return (
    <li className="p-2 text-sky-200 hover:scale-110  hover:cursor-pointer hover:transition-all">
      <Link to={path}>{name}</Link>
    </li>
  );
}

export default LiElements;
