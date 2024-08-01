import { useState } from "react";
// useState는 react가 제공하는 내장 함수로 스테이트를 생성하는데 쓰인다.

// 전구 ON/OF
const Bulb = () => {
  const [light, setLight] = useState("OFF");

  return (
    <div>
      {light === "ON" ? (
        <h1 style={{ backgroundColor: "orange" }}>ON</h1>
      ) : (
        <h1 style={{ backgroundColor: "gray" }}>OFF</h1>
      )}
      {/* 초기에 보일 값, 이후 상태변화함수(setState)로 인해 변할 값을 설정해줌 */}

      <button
        onClick={() => {
          setLight(light === "ON" ? "OFF" : "ON");
        }}
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button>
      {/* 버튼을 눌렀을 때 setLight에 의해 h1과 button의 상태(값, 컬러)가 변화하게 된다 */}
    </div>
  );
};

export default Bulb