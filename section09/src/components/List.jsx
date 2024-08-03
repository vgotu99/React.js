import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";
import { toDoStateContext } from "../App";

const List = () => {
  const todos = useContext(toDoStateContext);
  // props를 대신하여 context를 통해 { todos } 를 가져옴
  // toDoStateContext는 여러 데이터를 담고있는 객체가 아니고 todos 하나의 데이터만 담고 있기 때문에 { todos } 이런식으로 구조분해할당해주지 않아도 되고 todos 이런식으로 바로 불러오면 된다.

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
    // filter method는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함(true -> 포함, false -> 버림)
    // 모든 todo의 content 데이터 중에서 search에 들어있는 데이터를 포함하는 데이터만을 필터함.
    // 검색대상인 todo.content와 검색어인 search 모두 .toLowerCase() method를 이용하여 소문자로 변형시켜주면 대소문자 상관없이 검색해도 원하는 검색결과를 얻을 수 있다.
  };

  const filteredTodos = getFilteredData();

  // const getAnalizedData = () => {
  //   console.log("getAnalyezdData 호출")
  //   const totalCount = todos.length
  //   const doneCount = todos.filter((todo) => todo.isDone).length
  //   // filter method를 이용하였기 때문에 todos state에 저장되어있는 data가 많아질수록 성능이 떨어질 것이다.
  //   const notDoneCount = totalCount - doneCount

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount
  //   }
  // }

  // const {totalCount, doneCount, notDoneCount} = getAnalizedData()
  // // 위와 같은 성능상의 문제로 아래처럼 useMemo hook을 활용하여 최적화 해야한다.

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyezdData 호출");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    // filter method를 이용하였기 때문에 todos state에 저장되어있는 data가 많아질수록 성능이 떨어질 것이다.
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  // 두번째 인수인 [] 배열은 deps(의존성 배열)이다. deps에 들어있는 값이 바뀌면 첫번째 인수인 콜백함수를 다시 실행한다. 또한 이러한 과정으로 콜백함수가 다시 실행되어 새로운 값을 반환했을 때 useMemo는 그 값을 다시 반환한다.
  // 따라서 const 변수(useMemo가 반환하는 값) = useMemo(~~, []) 이런식으로 작성할 수 있다.
  // 콜백함수가 실행되어 얻은 값을 두번째 인수인 deps에 '메모이제이션'한다.
  // 만약 deps를 빈 배열로 두었을 때 콜백함수의 연산 수행과 반환이 해당 component가 최초로 렌더링되었을 때 딱 한번만 일어나게 된다. (deps를 빈배열로 두면 mount인 경우이다.)
  // 위의 경우에는 검색기능을 사용해서 검색을 할 때 위의 콜백함수가 계속 실행되는 것을 방지하고 싶었기 때문에 [ ] 배열 안에 todos를 넣어줘서 todos(투두리스트 내용) state에 값이 변경될 때만 콜백함수가 다시 실행되도록 해주었다.
  // 따라서 useMemo()는 deps의 값이 변한다면 콜백함수를 실행하고 반환된 값을 다시 반환한다.(반환된 값을 메모이제이션하는 것.)

  return (
    <div className="list">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>

      <input
        onChange={onChangeSearch}
        value={search}
        placeholder="검색어를 입력하세요"
      />
      <div className="todo_wrapper">
        {filteredTodos.map((todo) => {
          // map method는 기존 배열의 각 요소에 대하여 콜백함수를 수행한 이후 새로운 배열로 반환한다. jsx에서 사용할 때는 HTML요소뿐만 아니라 component를 반환하도록 할 수 있다.
          return <TodoItem key={todo.id} {...todo} />;
          // 리스트 형태(동일한 구조의 데이터가 반복되어있는 형태)로 랜더링된 component들이나 요소들을 구분할때 각각 고유한 값을 갖는 key라는 prop으로 구분하게 된다. 따라서 todo의 id property를 key로 쓰기로 했다.
          // {...todo}는 스프레드 연산자를 이용하여 todo의 모든 property를 복사하여 전달한다.
          // <TodoItem key={todo.id}{...todo} onUpdate={onUpdate} onDelete={onDelete} />에서 전달해주던 onUpdate, onDelete props들을 삭제하고 context를 이용하여 다이렉트로 TodoItem에게 해당 값을 전달해주었다.
        })}
      </div>
    </div>
  );
};

export default List;
