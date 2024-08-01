import { useState, useRef } from "react";

// 간단한 회원가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개
const Register = () => {
  // const [name, setName] = useState("");
  // const [birth, setBirth] = useState("")
  // const [country, setCountry] = useState("")
  // const [bio, setBio] = useState("")
  // // 사용자가 입력한 값들을 state를 통해 보관하고 데이터를 관리한다.
  // 위 4개의 state를 아래에 하나의 객체로 묶어주었다
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  const countRef = useRef(0)
  // ref는 state와 같이 컴포넌트 내부의 변수로 활용가능하여 데이터를 담아줄 수 있는데 값이 변경될 때마다 매번 리랜더링되는 state와 다르게 ref는 어떤 경우에도 리랜더링되지 않는다.
  // useState나 useRef를 이용하여 만든 리액트의 특수한 변수들은 component가 리랜더링된다고 하더라도 다시 리셋이 되지 않는다. 그렇기에 component 내부에 리셋되면 안될 값들은 useState나 useRef로 만들어줘야한다.

  const inputRef = useRef()


  // const onChangeName = (e) => {
  //   // onChangeName 함수는 아래 input에 입력된 값을 onChange라는 event로 받아와서 setName 함수를 호출하여 state에 보관해야한다.
  //   // 일단 이벤트 객체인 e를 매개변수로 설정하였다.

  //   // setName(e.target.value)
  //   // 위에서 따로 나눠져있던 state들을 하나의 state 객체 형태로 묶어주었다. 이때 name state 값을 받아오는 상태변화함수는 아래처럼 작성하면 되기에 주석처리하였다.

  //   setInput({
  //     ...input,
  //     // name state에 새로운 값이 입력되었을 때 기존 input state 객체에 들어가있던 name을 제외한 다른 property의 값이 변경되지않도록 스프레드 연산자를 이용하여 name state의 값만 따로 바뀌도록해주었다. -> 통합 state로 만들어주었기 때문에 ...input을 사용함!!!
  //     name: e.target.value,
  //     // 변경하고자 하는 property의 input값만 받아왔다.
  //   });
  //   // console.log(e)로 받아오는 데이터 중 사용자가 입력한 값인 e.target.value를 가져온 것
  // };

  // const onChangeBirth = (e) => {
  //   // setBirth(e.target.value)

  //   setInput({
  //     ...input,
  //     birth: e.target.value,
  //   });
  // };

  // const onChangeCountry = (e) => {
  //   // setCountry(e.target.value)

  //   setInput({
  //     ...input,
  //     country: e.target.value,
  //   });
  // };

  // const onChangeBio = (e) => {
  //   // setBio(e.target.value)

  //   setInput({
  //     ...input,
  //     bio: e.target.value,
  //   });
  // };
  // 맨 위에서 4개의 state들을 하나의 객체형태로 묶어준 것과 같이 4개의 상태변화함수도 아래에서 하나의 함수로 묶어주었다

  // 여러 이벤트 핸들러를 묶어 onChange라는 통합 이벤트 핸들러로 만들어주었다.
  const onChange = (e) => {
    countRef.current++
    // onChange 함수가 실행될 때마다(사용자가 입력란에 데이터를 입력할 때마다) countRef.current가 1씩 증가하도록 함
    // ref는 리랜더링되지 않으므로 이렇게 카운트를 세는데 자주 쓰인다
    console.log(countRef.current)

    setInput ({
      ...input,
      [e.target.name]: e.target.value
      // e.target은 이벤트(onChange)가 발생되는 HTML 태그를 가리키며 e.target.name에서 name은 특정 태그 즉,input, select, textarea 등과 같은 태그에서 사용 가능한 속성이다.
      // 현재는 [ ] 안에 e.target.name을 작성해주었으니 객체의 property의 key 이름에 해당하는 역할을 하고 있다.
    })
  }

  const onSubmit = () => {
    if(input.name === "") {
      inputRef.current.focus()
      // inputRef.current에 현재 우리가 접근하고자 하는 태그의 DOM 요소가 저장되어있으므로 .focus method를 이용하여 해당 DOM 요소에 포커스(바로 키보드 입력할 수 있도록 마우스 클릭 되어있는 상태)하였다.

    }
  }

  return (
    <div>
      <div>
        {/* <input value={input.name} onChange={onChangeName} placeholder={"이름"}></input> */}
        {/* value={name}은 위의 useState("이름")에서 설정된 초기 값을 받아와 input 태그 안의 초기값을 이름으로 설정한것. */}
        {/* onChange 속성은 값이 바뀌었을 때 이벤트가 발생함 */}
        {/* placeholder 속성은 input 태그 안에 회색 글씨로 입력되어져 이 곳에 어떤 데이터를 입력해야하는지 사용자가 알 수 있도록 함 */}
        <input ref={inputRef} name='name' value={input.name} onChange={onChange} placeholder={"이름"}></input>
        {/* ref={ }는 해당 input 태그가 랜더링하는 DOM요소가 inputRef라는 reference object에 저장되도록 함.
            name={ }은 해당 input 태그의 name 속성을 설정해주어 input state라는 state object에 저장되도록 함  */}
      </div>
      <div>
        {/* <input value={input.birth} onChange={onChangeBirth} type="date"></input> */}
        {/* type="date"는 달력에서 날짜를 선택하여 날짜 데이터를 받아올 수 있는 type */}
        <input name='birth' value={input.birth} onChange={onChange} type="date"></input>
      </div>
      <div>
        {/* <select value={input.country} onChange={onChangeCountry}> */}
        <select name='country' value={input.country} onChange={onChange}>
          <option value="">국가를 선택해주세요</option>
          <option value="kr">한국</option>
          {/* 사용자에게는 한국이라고 보여지지만 내부적으로 데이터를 관리하기 위한 value를 설정해주면 추후 state에 저장된 데이터를 정리하기 용이하다 */}
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
      </div>

      <div>
        {/* <textarea value={input.bio} onChange={onChangeBio} placeholder="본인을 소개해주세요."></textarea> */}
        <textarea name='bio' value={input.bio} onChange={onChange} placeholder="본인을 소개해주세요."></textarea>
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Register;
