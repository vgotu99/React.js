import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }; 

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    // filter method는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함(true -> 포함, false -> 버림)
    // 모든 todo의 content 데이터 중에서 search에 들어있는 데이터를 포함하는 데이터만을 필터함.
    // 검색대상인 todo.content와 검색어인 search 모두 .toLowerCase() method를 이용하여 소문자로 변형시켜주면 대소문자 상관없이 검색해도 원하는 검색결과를 얻을 수 있다.
  };

  const filteredTodos = getFilteredData()

  return (
    <div className="list">
      <h4>Todo List 🌱</h4>
      <input
        onChange={onChangeSearch}
        value={search}
        placeholder="검색어를 입력하세요"
      />
      <div className="todo_wrapper">
        {filteredTodos.map((todo) => {
        // map method는 기존 배열의 각 요소에 대하여 콜백함수를 수행한 이후 새로운 배열로 반환한다. jsx에서 사용할 때는 HTML요소뿐만 아니라 component를 반환하도록 할 수 있다.
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />;
          // 리스트 형태(동일한 구조의 데이터가 반복되어있는 형태)로 랜더링된 component들이나 요소들을 구분할때 각각 고유한 값을 갖는 key라는 prop으로 구분하게 된다. 따라서 todo의 id property를 key로 쓰기로 했다.
        })}
      </div>
    </div>
  );
};

export default List;
