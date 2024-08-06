// import { useSearchParams } from "react-router-dom"
// // 동적경로인 QueryString의 값을 가져오는 기능을 하는 custom hook (ex. 도메인?value=abc
// // 다만 감정일기장에서는 두가지 동적경로 중 URL parameter를 사용할 것이므로 일단 알아두고 나중에 실습해보자
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {

  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime()
  // beginTime은 달을 기준으로 구분되는 시작 시점
  // pivotDate.getFullYear(), pivotDate.getMonth, 1, 0, 0, 0은 pivotDate의 연도, pivotDate의 월, 1일, 0시, 0분, 0초 를 뜻한다
  // getTime()은 TimeStamp, 숫자값 형식으로 저장한다.

  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime()
  // 여기서 pivotDate.getMonth() + 1, 0, 23, 59, 59는 매달마다 마지막날이 다르므로 다음달을 기준으로 0일 즉 이번달의 마지막날 23시 59분 59초인 시점을 가져오겠다는 뜻이다.

  return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime)
}

const Home = () => {
  // const [params, setParams] = useSearchParams()
  // // useSearchParmas는 useState의 동작방식과 비슷하다.
  // // params에는 QueryString으로 전달한 ? 뒤에 오는 변수와 값이 들어온다.
  // // setParams에는 특정 QueryString의 값을 변경할 수 있는 함수가 들어온다.
  // console.log(params.get('value'))
  // // 다만 감정일기장에서는 두가지 동적경로 중 URL parameter를 사용할 것이므로 일단 알아두고 나중에 실습해보자
  const data = useContext(DiaryStateContext)
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle('감정 일기장')

  const monthlyData = getMonthlyData(pivotDate, data)

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        // getFullYear() method는 연도를 숫자로 반환한다
        // getMonth() method는 월을 숫자로 반환하지만 0부터 계산하기 때문에 1월은 0을 반환하고 12월은 11을 반환한다. 따라서 getMonth() + 1을 해주어서 현재 날짜의 월을 정확하게 반환할 수 있도록 해줘야만한다.
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData}/>
    </div>
  );
};

export default Home;
