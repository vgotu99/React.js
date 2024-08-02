import { useState } from "react";

const Controller = ({ onClickBtn }) => {
  const [input, setInput] = useState(0);
  // = useState()에서 ()안에 초기값은 반드시 설정해주어야한다. 설정해주지 않더라도 문법적 오류는 아니지만 input 값이 빈 값일 경우 undefined를 반환할 수 있다. 따라서 초기값은 0, "", null, [], {} 등으로 반드시 명확하게 설정해주자.

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
        value={input}
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
