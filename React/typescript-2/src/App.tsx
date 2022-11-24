import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //const value = event.currentTarget.value와 같은 것
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="username" value={value} onChange={onChange} />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
