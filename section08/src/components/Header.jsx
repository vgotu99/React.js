import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <h3>오늘은 🗓️</h3>
      <h1>{new Date().toDateString()}</h1>
      {/* 오늘의 날짜 가져오기 */}
    </div>
  );
};

export default Header;
