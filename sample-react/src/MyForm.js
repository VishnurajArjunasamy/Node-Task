import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");

  return (
    <>
      <form>
        <label>Enter a text:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <p>Text Entered is</p>
        <p>{name}</p>
      </form>
    </>
  );
}
