import "./Editor.css";
import { useState, useRef, useContext } from "react";
import { toDoDispatchContext } from "../App";

const Editor = () => {
  const { onCreate } = useContext(toDoDispatchContext);
  // useContext(인수) Hook은 인수에 담긴 데이터를 반환한다.
  // 따라서 const {불러오고싶은 인수의 값} = useContext(인수) 이런식으로 선언이 가능하다.
  // 이렇게 해주면 onCreate함수를 불러왔으니 const Editor = ({ onCreate })에서 props로 받아오던 { onCreate }는 삭제해주면 된다.
  const [content, setContent] = useState("");
  const contentRef = useRef();
  // input에 focus를 주기 위해서 useRef를 추가함

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content.trim() === "") {
      contentRef.current.focus();
      // 아래 input 태그에 ref={contentRef} 속성을 주었으므로 contentRef.current는 input태그를 가리키며 .focus()를 이용하여 포커스를 주었다.
      setContent("");
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="editor">
      <input
        ref={contentRef}
        // ref={contentRef}로 설정하여 해당 input태그에 접근할 수 있도록 하였다.
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        value={content}
        placeholder="새로운 Todo..."
      />
      {/* 값을 입력받는 곳에는 onChange 이벤트를 사용한다 */}
      <button onClick={onSubmit}>추가</button>
      {/* 해당 값을 제출하거나 하는 등 버튼을 눌렀을 때는 onClick 이벤트를 사용한다.  */}
    </div>
  );
};

export default Editor;
