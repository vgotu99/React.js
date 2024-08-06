import "./Editor.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/getStringedDate";


const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 0,
    content: "",
  });
  const nav = useNavigate();

  useEffect(() => {
    if(initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate))
      })
    }
  }, [initData])

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input, // 기존의 input state 값은 유지
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  return (
    <div className="editor">
      <div className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          type="date"
          value={getStringedDate(input.createdDate)}
        />
      </div>
      <div className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  // 원래라면 클릭되지 않는 EmotionItem component에게 onClick속성을 화살표 함수로 줘서 강제로 클릭되도록 했다. 또한 EmotionItem component로 이동해서 <div>에 onClick = {onClick} 이벤트를 속성으로 설정해줘야만 한다.
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </div>
      <div className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          placeholder="오늘은 어땠나요?"
          onChange={onChangeInput}
          value={input.content}
        ></textarea>
      </div>
      <div className="button_section">
        <Button
          text={"취소하기"}
          onClick={() => {
            nav(-1);
          }}
        />
        <Button
          onClick={onSubmitButtonClick}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </div>
    </div>
  );
};

export default Editor;
