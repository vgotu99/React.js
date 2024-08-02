import "./App.css";
import Viewer from "./component/Viewer";
import Controller from "./component/Controller";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // Viewer, Controller가 아닌 App component에 state를 작성하는 이유는 부모 component -> 자식 component로만 props를 통해 값을 전달할 수 있기 때문. Viewer에게는 count 값만 전달하고, Controller에게는 아래처럼 setCount가 일어났을 때 count에게 value만큼 더해지도록 한 onClickBtn이라는 이벤트 핸들러를 전달해주었다.

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
        <Viewer count={count} />
      </section>
      {/* section 태그로 component를 묶는 이유는 component들 마다 css 요소를 적용해주기 위함 */}
      <section className="controller">
        <Controller onClickBtn={onClickBtn} />
      </section>
    </div>
  );
}

export default App;
