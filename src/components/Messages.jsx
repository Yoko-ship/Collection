import React from "react";

function Messages({success,error}) {
  return (
    <>
      {success && (
        <div className="flex justify-center p-2">
          <p className="text-green-500 text-xl">{success}</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center p-2">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </>
  );
}

export default Messages;
