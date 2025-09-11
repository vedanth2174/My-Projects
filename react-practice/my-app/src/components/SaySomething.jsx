import React, { useState } from "react";

function SaySomething() {
  const [message, setMessage] = useState("");

  const handleHi = () => setMessage("Hi Vedant!");
  const handleBye = () => setMessage("Bye Vedant!");

  return (
    <>
      <button onClick={handleHi}>Say Hi</button>
      <button onClick={handleBye}>Say Bye</button>
      <h1>{message}</h1>
    </>
  );
}

export default SaySomething;