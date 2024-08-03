import "./App.css";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
// import Exam from "./components/Exam";

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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    // 왜 [ ](배열)에 담아줬을까? action.data라는 객체를 여러개 받을 예정이기 때문에!
    // [새로 넣을 값, ...기존 state(기존 state를 spread로 펼쳐주기)]
    case "UPDATE":
      return state.map(
        (item) =>
          item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
        // ...item, isDone: !item.isDone = 모든 item을 펼쳐서 isDone property의 value를 반전시킨다(false -> true, true -> false)
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

// export const toDoContext = createContext();
// // 부모 component -> 자식 component -> ... -> 자식의 자식 component에게 props를 전달하는 것을 props drilling이라고 한다.
// // context는 이러한 props drilling을 해결하고자 자식 component는 물론이고 자식의 자식 component에게도 다이렉트로 props를 한번에 전달하기 위한 별도의 component이다.
// toDoContext에는 값이 변경될 수 있는 todos state와 값이 변경되면 안되서 메모이제이션 해준 onCreate, onUpdate, onDelete가 함께 있다. 하지만 todos state의 값이 변하게 된다면 toDoContext라는 component 자체가 리렌더링되기 때문에 메모이제이션 해준 것이 무의미해지기 때문에 변할 수 있는 값과 변하면 안되는 값을 따로 나눠서 다른 context에 담아줘야한다.
export const toDoStateContext = createContext();
export const toDoDispatchContext = createContext();
// 변하지 않아야하는 toDoDispatchContext에 담길 데이터(객체 형태)들은 반드시 useMemo하여 새로운 변수에 담아주어야 한다. 153번째 줄에 useMemo 사용한 코드 작성해둠

function App() {
  // const [todos, setTodos] = useState(mockData);
  // // 초기값을 mockData로 설정해주었고, mockData는 여러개의 객체를 갖고있는 배열이므로 state에는 여러개의 데이터가 담길 것으로 볼 수 있다.
  // 기존에 학습했던 위의 useState를 이용하여 기능구현했던 내용을 주석처리하고 useReducer라는 훅을 이용해서 같은 기능을 하도록 아래에 작성했다
  const [todos, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(3);
  // mockData에 있는 id가 0, 1, 2 이기 때문에 겹치지 않도록 초기값을 3으로 설정함

  const onCreate = (content) => {
    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime(),
    // // 기존에 학습했던 useState를 이용하여 기능구현했던 내용을 주석처리하고 useReducer라는 훅을 이용해서 같은 기능을 하도록 아래에 작성했다
    // };

    // // todos.push(newTodo)
    // // // push method를 사용해서 todos state에 newTodo라는 객체를 push해줄 수는 없다. 왜냐면 state에 대한 값을 변경할 수 있는 것은 setState뿐이고 그래야만 react가 setState로 인한 state 변화를 감지하고 component를 정상적으로 리랜더링시켜주기 때문임!
    // // 아래에 해당 기능을 할 수 있는 setTodos함수 작성해둠

    // setTodos([newTodo, ...todos]);
    // // setState([추가하고싶은데이터, ...state])로 state에 원하는 데이터를 추가할 수 있다. 이는 기존에 있던 값을 삭제하고 새로운 값을 그 자리에 넣는 것이 아니고, 새로운 데이터를 계속 쌓아가는 형태이다.
    // 기존에 학습했던 위의 useState를 이용하여 기능구현했던 내용을 주석처리하고 useReducer라는 훅을 이용해서 같은 기능을 하도록 아래에 작성했다
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  // const onUpdate = (targetId) => {
  //   // todos state의 값들 중 id가 targetId와 일치하는 todo의 isDone을 변경하는 기능을 만들겠다.

  //   // 아래 setTodos()의 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터(isDone)만을 바꾼 새로운 배열
  //   // setTodos(
  //   //   todos.map((todo) =>
  //   //     // {
  //   //     //   if (todo.id === targetId) {
  //   //     //     return {
  //   //     //       ...todo,
  //   //     //       isDone: !todo.isDone,
  //   //     //     };
  //   //     //   }
  //   //     //   return todo;
  //   //     // }
  //   //     // 이런 경우에는 { if문 }을 쓰는 거 보다 그냥 삼항연산자를 활용하여 짧게 작성해주자
  //   //     todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
  //   //   )
  //   // );
  //   // 기존에 학습했던 위의 useState를 이용하여 기능구현했던 내용을 주석처리하고 useReducer라는 훅을 이용해서 같은 기능을 하도록 아래에 작성했다
  //   dispatch({
  //     type: "UPDATE",
  //     targetId: targetId,
  //   });
  // };

  // const onDelete = (targetId) => {
  //   // // 아래 setTodos()의 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
  //   // setTodos(todos.filter((todo) => todo.id !== targetId));
  //   dispatch({
  //     type: 'DELETE',
  //     targetId: targetId
  //   })
  // };
  // onUpdate함수와 onDelete함수를 메모이제이션해주기 위하여 useCallback 함수를 이용하여 아래에 다시 만들어주었다.

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);
  // useCallback(최적화하고 싶은 함수, deps) => deps가 변경되었을 때 해당 콜백함수를 생성하고 해당 함수 자체를 반환한다. (함수 그 자체를 메모이제이션 해주는 것)
  // useMemo는 deps(두번째 인수)가 변경되면 콜백함수(첫번째 인수)가 실행된 후 반환된 값을 반환하고, useCallback은 deps(두번째 인수)가 변경되면 콜백함수(첫번째 인수)가 생성되고 해당 콜백함수 자체를 반환한다.

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);
  // toDoDispatchContext의 value에 담길 값인 { onCreate, onUpdate, onDelete }가 App component에서 todos state가 변경되어 App component 전체가 리렌더링된다면 { onCreate, onUpdate, onDelete } 도 새롭게 다시 생성(값이 변함)될 것이므로 그걸 방지하기 위하여 useMemo(~~, [])를 사용하여 { onCreate, onUpdate, onDelete }의 값이 처음 마운트될 때만 생성되고 다시는 재생성되지 않도록 메모이제이션해줌

  return (
    <div className="App">
      <Header />

      {/* <toDoContext.Provider value={{todos, onCreate, onUpdate, onDelete}}>
        <Editor />
        <List />
      </toDoContext.Provider> */}
      {/* toDoContext.provider라는 component로 props를 전달받고 있는 component들을 감싸주고 toDocontext.provider에게 value={ {모든 props들}(<-객체형태임) } 라는 props를 할당해주면 된다. 그러면 toDocontext.provider는 Editor component와 List component의 부모 component로 설정된 것이다. 하지만 context는 자식의 자식 component들에게도 다이렉트로 props를 제공해줄 수 있기때문에 App -> toDoContext.provider -> Editor와 Editor의 자식들의 자식들까지 전부, List와 List의 자식들의 자식들까지 전부 다이렉트로 props를 전달할 수 있게된다. */}
      {/* App component로 부터 context.provider가 value로 props를 전부 받아갔으니까 Editor component와 List component는 더 이상 App component로부터 props를 받아갈 필요가 없다. 따라서 Editor와 List에서 받아가던 props는 삭제하면 된다. */}
      {/* 하지만 변할 수 있는 값 todos와 변하면 안되는 값 onCreate, onUpdate, onDelete가 하나의 context에 있으면 변하면 안되는 값이 변할 수 있는 값이 바뀔 때마다 변하게 되기 때문에 변할 수 있는 값을 담은 context, 변하면 안되는 값을 담은 context로 나눠줘야한다. 아래 코드 참고 */}
      <toDoStateContext.Provider value={todos}>
        <toDoDispatchContext.Provider value={memoizedDispatch}>
          {/* 메모이제이션한 { onCreate, onUpdate, onDelete }를 담은 memoizedDispatch를 value props로 전달해줌. */}
          <Editor />
          <List />
        </toDoDispatchContext.Provider>
      </toDoStateContext.Provider>
      {/* <Exam /> */}
    </div>
  );
}

export default App;
