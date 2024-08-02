import { useState } from "react";

const Controller = ({ onClickBtn }) => {
  const [input, setInput] = useState();

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <button
        onClick={() => {
          onClickBtn(-1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          onClickBtn(-10);
        }}
      >
        -10
      </button>
      <button
        onClick={() => {
          onClickBtn(-100);
        }}
      >
        -100
      </button>
      <button
        onClick={() => {
          onClickBtn(+100);
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
          onClickBtn(+10);
        }}
      >
        +10
      </button>
      <button
        onClick={() => {
          onClickBtn(+1);
        }}
      >
        +1
      </button>
      <input
        onChange={changeInput}
        value={input || ""}
        type="number"
        placeholder="원하는 값을 입력하세요."
      />
      <button
        onClick={() => {
          onClickBtn(Number(input));
        }}
      >
        count
      </button>
    </div>
  );
};

export default Controller;
