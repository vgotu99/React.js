import { useState } from "react";
// useState는 react가 제공하는 내장 함수로 스테이트를 생성하는데 쓰인다.

// 카운트업
const CountUp = () => {
  const [count, setCount] = useState(0);
  // 일반적으로 사용하는 const 변수명 = 이 아닌 state에서는 배열형태의 값을 받을 예정이므로 구조분해할당을 활용하여 const [state이름, setState이름] = useState(초기state값)로 선언해주어야한다.
  // state이름은 state의 현재 값, setState이름은 해당 state를 변경시키는 상태 변화 함수

  // console.log(state)
  // // [n, f()]이라는 배열형태의 값이 반환되는데 여기서 n은 state의 현재 값이고 f()는 해당 state를 변경시키는 상태 변화 함수이다. 따라서 어차피 배열형태의 값을 받을 거니까 첫줄에서 const [state, setState] = useState(0)으로 선언해준 것이다.
  const countButton = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>{count}</h1>
      {/* 초기에 보일 값, 이후 상태변화함수(setState)로 인해 변할 값을 설정해줌 */}
      {/* <button onClick={() => {setCount(count + 1)}}>+</button> */}
      {/* setCount(count + 1) 처럼 짧은 경우에는 화살표 함수 형태로 작성해주어도 된다. 하지만 아래 새로운 함수를 할당하여 작성한 onClick도 있으니 확인해보자 */}
      <button onClick={countButton}>+</button>
      {/* + 버튼을 눌렀을 때 h1의 상태(값)가 변화하게된다 */}

    </div>
  );
};

export default CountUp;
