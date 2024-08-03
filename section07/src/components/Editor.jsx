import "./Editor.css";
import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
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
      setContent("")
      return;
    }
    onCreate(content);
    setContent("")
  };

  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
        onSubmit()
    }
  }

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
