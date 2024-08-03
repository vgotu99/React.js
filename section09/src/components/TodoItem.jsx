import "./TodoItem.css";
import { memo, useContext } from "react";
import { toDoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  // props를 대신하여 context를 통해 { onUpdate, onDelete }를 가져옴
  const { onUpdate, onDelete } = useContext(toDoDispatchContext)

  const onChangeCheckBox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="todoItem">
      <input
        onChange={onChangeCheckBox}
        // onClick이 아닌 onChange인 이유는 button이 아닌 input이기 때문이다.
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};


// // 고차 컴포넌트 (HOC) = 기존 컴포넌트에 추가적인 기능을 덧붙여서 기능이 추가된 새로운 컴포넌트
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 콜백함수의 매개변수로 pervProps(과거의 props), nextProps(미래의 props)를 전달해줘서 반환값에 따라서 props가 바뀌었는지 안바뀌었는지 판단한다.
//   // true -> props 바뀌지 않음 => 리렌더링 xxxx
//   // false -> props 바뀜 => 리렌더링 oooo
//   if (prevProps.id !== nextProps.id) return false
//   if (prevProps.isDone !== nextProps.isDone) return false
//   if (prevProps.content !== nextProps.content) return false
//   if (prevProps.date !== nextProps.date) return false

//   return true
// });
// // memo()는 값의 변동 유무를 얕은비교로 판단하기 때문에 App component 내부에서 생성된 onUpdate(), onDelete()와 같은 모든 함수들은 객체 타입에 해당하는 값이기 때문에 App component가 리렌더링되었을 때 해당 함수들은 완전히 다른 주소값을 갖는 객체 타입으로 새롭게 생성된다. 따라서 해당 props들이 변경되기 때문에 memo(TodoItem)을 하더라도 TodoItem component가 리렌더링되는 것이다.
// // 따라서 이러한 상황에서는 memo(component, 콜백함수)로 memo 함수를 customize하여 해결해줄 수 있다. (위에 주석 처리한 부분에 설명 있음!)

// App component에서 useCallback을 사용하여 onUpdate, onDelete를 메모이제이션해주었기 때문에 더이상 위에 작성한 것 처럼 memo를 커스텀하여 작성할 필요가 없고 그냥 memo(TodoItem)으로만 작성해줘도 최적화가 이뤄진다. 추후 유지보수하기에도 함수 자체를 메모이제이션하는 useCallback이 훨씬 더 유리함.


export default memo(TodoItem)