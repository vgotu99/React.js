import "./App.css";

// import Header from "./components/Header.jsx";
// import Main from "./components/Main.jsx";
// import Footer from "./components/Footer.jsx";
// import Button from "./components/Button.jsx";

// import Bulb from './components/Bulb.jsx'
// import CountUp from "./components/CountUp.jsx";

import Register from "./components/Register";
import HookExam from "./components/HookExam";


// ### Header, Main, Footer, Button 실습 - 부모 component와 자식 component
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
// }
// 부모 component, Root component
// HTML 요소를 담고있는 component들은 모두 App component의 자식 관계가 되어야 화면에 랜더링될 수 있다. ex) Header, Main, Footer 등등


// CountUp, Bulb 실습 - state, 리랜더링
// function App() {
//   return (
//     <>
//       <CountUp />
//       <Bulb />
//     </>
//   );
// }
// // state의 값이 바뀌면 component가 다시 return하게되며 변한 state의 값이 화면을 다시 랜더링해준다. 이를 리랜더링이라고 한다. 따라서 state는 가변적인 값을 이용하여 화면에 변화를 주기 위해서 사용한다!!!!!

// // component가 리랜더링 되는 경우
// // 1. 자신이 관리하는 state의 값이 변경되었을 때
// // 2. 자신이 제공받는 props의 값이 변경되었을 때
// // 3. 부모 component가 리랜더링 되었을 때
// // 만약 관련 없는 두 component(Bulb, CountUp)가 부모 component에서 호출된 것이 아니고 직접 안에 작성했을 때 하나의 자식 component(Bulb)가 리랜더링된다면 부모 component는 리랜더링되고 다른 하나의 자식 component(CountUp)도 함께 리랜더링되어 의도하지 않은 불필요한 리소스가 낭비된다. 따라서 관련이 없는 두 component(Bulb, CountUp)는 한 component(특히 부모 component)에 함께 작성하지 않고 반드시 분리해서 작성해주고 부모 component에서는 해당 component를 호출해주기만 하면 된다


function App() {
  return (
    <>
      <Register />
      <br></br>
      <HookExam />
    </>
  )
}


export default App;
