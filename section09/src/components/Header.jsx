import './Header.css'
import { memo } from 'react';

const Header = () => {
  return (
    <div className="header">
      <h3>오늘은 🗓️</h3>
      <h1>{new Date().toDateString()}</h1>
      {/* 오늘의 날짜 가져오기 */}
    </div>
  );
};

const memoizedHeader = memo(Header)
// 부모 component(App component)가 리렌더링 되어서 불필요하게 리렌더링될 필요없는 자식 component(Header component)까지 렌더링 되는 것은 성능상 낭비이기때문에 memo(component)라는 내장함수를 이용해서 component 자체가 받아온 props를 기준으로 메모이제이션되도록 해주었다. 그러면 memoized된 component는 받아오는 props가 바뀌지 않는 한 리렌더링되지 않는다.
// React.memo를 활용한 최적화 방법

export default memoizedHeader;
// 기존에 Header를 export했는데 Header를 memoized하였기 때문에 memoizedHeader를 export하도록 바꿨다.
// export default memo(Header) 로 작성하더라도 아무런 문제 없음.
