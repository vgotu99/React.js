import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate,} from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate()
  
    useEffect(() => {
      
      const currentDiaryItem = data.find(
        (item) => String(item.id) === String(id)
      );
  
      if (!currentDiaryItem) {
        window.alert("존재하지 않는 일기입니다.");
        //   팝업창(확인=true 버튼만을 포함)을 띄우는 브라우저 내장기능을 사용한 함수
        nav("/", { replace: true });
      }
      setCurDiaryItem(currentDiaryItem);
    }, [id, data]);

    return curDiaryItem
}

export default useDiary