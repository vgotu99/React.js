import "./App.css";
// import Header from "./components/Header.jsx";
// import Main from "./components/Main.jsx";
// import Footer from "./components/Footer.jsx";
// import Button from "./components/Button.jsx";
// 아래에서 state 실습해야해서 윗 내용 주석처리함
import { useState } from "react";
// useState는 react가 제공하는 내장 함수로 스테이트를 생성하는데 쓰인다.

// function HeaderEx() {
//   // component 함수명은 항상 대문자로 시작해야하며 아래 return문 안에 HTML 요소를 넣어주면 된다.
//   return(
//     <header>
//       <h1>header</h1>
//     </header>
//   )
// }
// // 자식 component
// // 자식과 부모 component간의 관계를 보기 위해서 주석처리하고 남겨둠. 실제로 동작하는 Header는 ./components/Header.jsx에 있어

// const buttonProps = {
//   text: "블로그",
//   color: "blue",
//   a: 1,
//   b: 2,
//   c: 3
// }

// function App() {
//   return (
//     <>
//       <Header />
//       {/* 자식 component Header를 부모 component인 App안에 포함시켜준 모습
//       따라서 main.jsx에서 App component를 불러오면 Header component도 화면에 랜더링 되는 것이다 */}
//       <Main />
//       <Footer />

//       <Button text={"메일"} color={"red"} />
//       <Button {...buttonProps} />
//       {/* 위에서 buttonProps라는 객체를 만들어주고 스프레드 연산자를 활용하여 ...buttonProps로 props를 뿌려주었다. */}
//       <Button text={"카페"}>
//         <div>자식요소</div>
//         <Header />
//         {/* 자식요소로는 HTML 태그 외에 자식 component도 불러올 수 있다. */}
//       </Button>
//     </>
//   );
//   아래에서 state 실습해야해서 윗 내용 주석처리함
function App() {
  const [count, setCount] = useState(0);
  // 일반적으로 사용하는 const 변수명 = 이 아닌 state에서는 배열형태의 값을 받을 예정이므로 구조분해할당을 활용하여 const [state이름, setState이름] = 로 선언해주어야한다.
  // state이름은 state의 현재 값, setState이름은 해당 state를 변경시키는 상태 변화 함수

  // console.log(state)
  // // [n, f()]이라는 배열형태의 값이 반환되는데 여기서 n은 state의 현재 값이고 f()는 해당 state를 변경시키는 상태 변화 함수이다. 따라서 어차피 배열형태의 값을 받을 거니까 첫줄에서 const [state, setState] = useState(0)으로 선언해준 것이다.
  const [light, setLight] = useState("OFF");

  return (
    <>
      <div>
        <h1>{count}</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          // 반드시 화살표 함수 형태로 작성해주어야한다.
        >
          +
        </button>
      </div>
      <div>
        <h1>{light}</h1>
        <button
          onClick={() => {
            setLight(light === "ON" ? "OFF" : "ON");
          }}
        >
          {light === "ON" ? "끄기" : "켜기"}
        </button>
      </div>
    </>
  );
  // state의 값이 바뀌면 component가 다시 return하게되며 변한 state의 값이 화면을 다시 랜더링해준다. 이를 리랜더링이라고 한다. 따라서 state는 가변적인 값을 이용하여 화면에 변화를 주기 위해서 사용한다!!!!!
}
// 부모 component, Root component
// HTML 요소를 담고있는 component들은 모두 App component의 자식 관계가 되어야 화면에 랜더링될 수 있다. ex) Header, Main, Footer 등등

export default App;
