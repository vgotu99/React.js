import "./App.css";
import Viewer from "./component/Viewer";
import Controller from "./component/Controller";
import Even from "./component/Even";
import { useState, useEffect, useRef  } from "react";

function App() {
  const [count, setCount] = useState(0);
  // Viewer, Controller가 아닌 App component에 state를 작성하는 이유는 부모 component -> 자식 component로만 props를 통해 값을 전달할 수 있기 때문. Viewer에게는 count 값만 전달하고, Controller에게는 아래처럼 setCount가 일어났을 때 count에게 value만큼 더해지도록 한 onClickBtn이라는 이벤트 핸들러를 전달해주었다.
  const [test, setTest] = useState("")

  const isMount = useRef(false)

  // React 라이프사이클
  // 1. 마운트: 탄생
  useEffect(() => {
    console.log('mount')
  }, [])
  // 두번째 인수를 빈배열로 하면 처음 마운트되었을 때 한번만 콜백함수가 실행된다.

  // 2. 업데이트: 변화, 리랜더링
  useEffect(() => {
    if(!isMount.current) {
      isMount.current = true
      return
    }
    // isMount의 초기값을 false로 지정해두었는데 !(not연산자)를 이용하여 if(!isMount.current) 조건문이 true를 반환하도록 하였고 isMount.current의 값을 true로 바꿔주었다. 그 이후 return하여 해당 함수를 강제종료하여 아래 console.log('update')가 실행되지 않도록 하였다. 따라서 마운트되었을 때 console.log('update')는 실행되지 않고 마운트된 이후 isMount.current 값은 true가 되었기 때문에 위 조건문에서 return되지 않고 업데이트될 때마다 console.log('update')는 정상적으로 실행된다.
    // mount 되었을 때는 실행되지 않고 component가 업데이트(리랜더링)되었을때만 실행되도록 하려면 ref 객체를 생성해서 플래그로써 사용하면 된다.
    console.log('update')
  })
  // 두번째 인수를 설정하지 않고 비워두면 마운트될 때 한번 실행되고 이후 해당 component가 리랜더링될 때마다 계속 실행된다.

  // 3. 언마운트: 죽음
  // './component/Even.jsx'에 예시를 작성해둠



  useEffect(() => {
    // console.log(`count: ${count} / input: ${test}`)
  }, [count, test])
  // useEffect(콜백함수, 배열) / 두번째 인수인 배열에 들어가있는 값이 변경되면 side-effect로 첫번째 인수인 콜백함수가 실행된다.
  // useEffect는 두번째 인수에 있는 배열에 의존하여 동작하기에 의존성 배열이라고 얘기한다. = dependency array = deps

  const onClickBtn = (value) => {
    // value는 Controller component에 있는 button 태그 안에 있는 -1, -10, +1 과 같은 값
    setCount(count + value);
  };
  // 이벤트 핸들러를 만들어서 전달해주지 않고 count와 setCount를 모두 전달해주어서 Controller component에 setCount(count +10) 이런식으로 작성해줄 수도 있지만 이벤트 핸들러를 만들어서 넘겨주는 것이 좋다

  return (
    <div className="App">
      {/* 최상위 태그를 빈 태그로 둔다면 css 속성을 적용하지 못한다. why? 빈 태그에는 className, id를 적용할 수 없기 때문   */}
      <h1>Simple Counter</h1>
      <section>
        <input value={test} onChange={(e) => {
          setTest(e.target.value)
        }} />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
        {/* 짝수일 때 Even component가 불러와지고(mount되고) 짝수에서 홀수가 될 때 Even component가 종료되고(unmount되고) Even component에 있는 정리함수가 실행된다. */}
      </section>
      {/* section 태그로 component를 묶는 이유는 component들 마다 css 요소를 적용해주기 위함 */}
      <section className="controller">
        <Controller onClickBtn={onClickBtn} />
      </section>
    </div>
  );
}

export default App;
