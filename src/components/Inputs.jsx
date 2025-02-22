import React from "react";

function Inputs({ name, type, getValue,value}) {
  return (
    <>
      <label className="text-xl font-thin text-white">{name}</label>
      <input
        type={type}
        className=" border-1 border-x-white outline-0 text-white text-2xl rounded-md p-2 w-1/4"
        onChange={(e) => getValue(e.target.value)}
        required
        min={1}
        max={10}
        value={value}
      />
    </>
  );
}

export default Inputs;
