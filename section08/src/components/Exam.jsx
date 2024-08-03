import { useReducer } from "react";
// useReducer는 useState와 동일하게 state를 관리하는데 쓰인다.
// useReducer는 상태관리코드를 component내부로 부터 분리하여 component 외부에 작성할 수 있다.

// reducer: 변환기
// => 상태를 실제로 변화시키는 변환기 역할을 함
function reducer(state, action) {
  // 두번째 인수인 action은 아래 component 내부에 있는 dispatch의 인수
  console.log(state, action);
  //   if (action.type === "INCREASE") {
  //     return state + action.data;
  //     // state + action.data의 값이 useReducer에게 반환되고 useReducer는 state에 새로운 값을 저장한다.
  //     // dispatch -> useReducer -> reducer -> useReducer -> state값에 저장
  //   } else if (action.type === "DECREASE") {
  //     return state - action.data
  //   }
  // 보통 action.type이 너무 많아지기 때문에 if문을 사용하는 거 보다 아래처럼 swtich문을 사용해서 작성하자
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  // dispatch: 발송하다, 급송하다
  // => 상태 변화가 있어야 한다는 사실을 알리는(발송하는) 함수
  const [state, dispatch] = useReducer(reducer, 0);
  // state는 state / dispatch(발송하다)는 상태 변화를 요청(발송)하기만 하는 함수 / useReducer가 상태 변화를 실제로 처리하게될 reducer 함수를 호출함. / reducer 함수는 component 밖에 생성한다
  // dispatch -> useReducer -> reducer
  // useReducer(상태를 실제로 변화시키는 함수(변환기), state의 초기값)

  const onClickPlus = () => {
    // 인수: 상태가 어떻게 변화되길 원하는지 작성한 객체(액션 객체)
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
