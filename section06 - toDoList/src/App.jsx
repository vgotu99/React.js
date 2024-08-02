import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const mockData = [
  // 기능 구현 전 mock(임시)데이터를 만들어주었다.
  {
    id: 0,
    isDone: false,
    // 할 일을 끝냈는지 확인하기 위한 체크박스
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  // 초기값을 mockData로 설정해주었고, mockData는 여러개의 객체를 갖고있는 배열이므로 state에는 여러개의 데이터가 담길 것으로 볼 수 있다.
  const idRef = useRef(3);
  // mockData에 있는 id가 0, 1, 2 이기 때문에 겹치지 않도록 초기값을 3으로 설정함

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    // todos.push(newTodo)
    // // push method를 사용해서 todos state에 newTodo라는 객체를 push해줄 수는 없다. 왜냐면 state에 대한 값을 변경할 수 있는 것은 setState뿐이고 그래야만 react가 setState로 인한 state 변화를 감지하고 component를 정상적으로 리랜더링시켜주기 때문임!
    // 아래에 해당 기능을 할 수 있는 setTodos함수 작성해둠

    setTodos([newTodo, ...todos]);
    // setState([추가하고싶은데이터, ...state])로 state에 원하는 데이터를 추가할 수 있다. 이는 기존에 있던 값을 삭제하고 새로운 값을 그 자리에 넣는 것이 아니고, 새로운 데이터를 계속 쌓아가는 형태이다.
  };

  const onUpdate = (targetId) => {
    // todos state의 값들 중 id가 targetId와 일치하는 todo의 isDone을 변경하는 기능을 만들겠다.

    // 아래 setTodos()의 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터(isDone)만을 바꾼 새로운 배열
    setTodos(
      todos.map((todo) => 
      // {
      //   if (todo.id === targetId) {
      //     return {
      //       ...todo,
      //       isDone: !todo.isDone,
      //     };
      //   }
      //   return todo;
      // }
      // 이런 경우에는 { if문 }을 쓰는 거 보다 그냥 삼항연산자를 활용하여 짧게 작성해주자
      todo.id === targetId? {...todo, isDone:!todo.isDone} : todo
    ));
  };

  const onDelete = (targetId) => {
    // 아래 setTodos()의 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId))
  }

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
