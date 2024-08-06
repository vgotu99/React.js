import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    // $title로 변수명을 설정해준 이유는 관례상 DOM 요소를 저장할 거라는 뜻이다.
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
