import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState("latest");

  const onChangeSrotType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      // sort method는 원본 배열 자체를 정렬한 이후 아무것도 반환하지 않는다.
      // toSorted method는 원본 배열은 그대로 두고 정렬된 새로운 배열을 반환한다.
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  const nav = useNavigate();

  return (
    <div className="diaryList">
      <div className="menu_bar">
        <select onChange={onChangeSrotType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          type={"POSITIVE"}
          text={"새 일기 쓰기"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item)  => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
