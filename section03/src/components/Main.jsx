// JSX 주의사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다. ex) 문자열, 숫자열, 사칙연산자, 삼항연산자 등만 넣을 수 있다. if문(조건문), for문(반복문) 등은 불가능
// 2. 숫자, 문자열, 배열 값만 정상적으로 랜더링 된다. 객체(객체의 특정 키 값은 숫자 or 문자열 or 배열이므로 객체.키 로 해당 키의 값을 가져올 수는 있다.), 불리언, falsy, truthy한 값은 랜더링되지 않는다 따라서 사용XXX
// 3. 모든 태그는 닫혀있어야한다 <tag> </tag> or < <tag />
// 4. 최상위 태그(부모 태그)는 반드시 하나여야만 한다. 빈 태그<> </>로 최상위 태그를 만들어주고 그 안에 자유롭게 작성하는 방법도 있다.
//

import "./Main.css"

function Main() {
  // const number = 10
  // const obj = {
  //     a: 1,
  //     b: 2
  // }

  const user = {
    name: "이승건",
    isLogin: false,
  };

//   return (
//     <main>
//         <h1>Main</h1>
//         <h2>{number}</h2>
//         <h2>{number % 2 === 0 ? "짝수" : "홀수"} </h2>
//         {10}
//         {number}
//         {true}
//         {undefined}
//         {null}
//         {obj.a}
//         {/* 객체는 랜더링되지 않으므로 obj.a로 값을 불러와 사용하자 */}
//     </main>
//   )

//   return (
//     <>
//       {user.isLogin === true ? <div>로그아웃</div> : <div>로그인</div>}
//       {/* === ture는 당연히 생략가능 */}
//     </>
//   );
// 위 return()안에 삼항연산자를 사용하여 작성해주는 것도 가능하고 아래 if 조건문을 이용하여 작성도 가능하다
  if (user.isLogin) {
    return <div>로그아웃</div>
  } else {
    return <div className="logout"
    // style={{
    //     backgroundColor: "red",
    //     borderBottom: "5px solid blue"
    // }}
    // style={{ }} 안에 HTML에서 태그별로 스타일 속성을 주는 것의 형태와 JS의 .style.스타일속성 = "값"의 작성 방식으로 작성해줄 수도 있지만 당연히 css 파일 별도 분리하자.
    >로그인</div>
  }
}

export default Main;
