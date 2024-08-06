import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, json } from "react-router-dom";
// react-router-dom은 기존의 방식인 Server Side Rendering을 하는 MPA(Multi Page Application)방식이 아닌 Client Side Rendering을 하는 SPA(Single Page Application)방식으로 페이지 라우팅이 가능하도록 한다.
// Routes와 Route는 react route dom의 페이지 라우팅이 가능한 페이지를 구성하는 기능을 하는 component이다.
// Link는 react route dom이 제공하는 별도의 component로 페이지를 이동시키는(새로운 페이지를 페이지 라우팅하여 랜더링하는) 기능을 한다.
// useNavigate는 react route dom이 제공하는 custom hook으로 페이지를 이동시키는 navigate함수를 반환하는 기능을 한다.
import Home from "./pages/Home.jsx";
import Diary from "./pages/Diary.jsx";
import New from "./pages/New.jsx";
import Edit from "./pages/Edit.jsx";
import NotFound from "./pages/NotFound.jsx";

// import emotion1 from "./assets/emotion1.png";
// import emotion2 from "./assets/emotion2.png";
// import emotion3 from "./assets/emotion3.png";
// import emotion4 from "./assets/emotion4.png";
// import emotion5 from "./assets/emotion5.png";
// emotion 이미지 파일들이 src 폴더 아래에 저장되어있으므로 import문을 통해서 불러올 수 있다.
// 이미지가 많아졌을 때 이미지를 불러오는 import문이 너무 많아질 수 있기 때문에 ./util/get-emotion-images.js라는 모듈에 따로 담아주었다.
import { getEmotionImage } from "./util/get-emotion-image.js";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "/edit" : 일기를 수정하는 Edit 페이지


function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT' : {
      return action.data
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break
    }
    default:
      return state;
  }
  // reducer 함수가 실행되고 'CREATE', 'UPDATE', 'DELETE'될 때마다 nextState라는 변수에 값이 담긴다.

  localStorage.setItem('diary', JSON.stringify(nextState))
  // 로컬스토리지에 diary라는 키에 대한 값으로 nextState의 값이 담김

  return nextState;
  // 그 이후 nextState에 담긴 값을 반환한다
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const nav = useNavigate();
  // // useNavigate는 함수를 반환하기 때문에 별도의 함수에 할당해줄 수 있다.

  // const onClickButton = () => {
  //   nav("/new");
  //   // nav('/경로')
  // };
  const [isLoading, setIsLoading] = useState(true)
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);

  useEffect(() => {
    const storedData = localStorage.getItem('diary')
    if(!storedData) {
      setIsLoading(false)
      return
    }
    const parsedData = JSON.parse(storedData)
    if(!Array.isArray(parsedData)) {
      setIsLoading(false)
      return
    }

    let maxId = 0
    parsedData.forEach((item) => {
      if(Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    })

    idRef.current = maxId + 1

    dispatch ({
      type: 'INIT',
      data: parsedData
    })
    setIsLoading(false)
  }, [])
  // 두번째 인수를 빈배열로 하여 처음에 마운트 될 때만 실행되도록 함

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };
  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if(isLoading) {
    return <div>데이터 로딩중입니다...</div>
  }

  return (
    <>
      {/* <div>
        <img src={emotion1} />
        <img src={emotion2} />
        <img src={emotion3} />
        <img src={emotion4} />
        <img src={emotion5} />
        asset 폴더에 있던 이미지들을 바로 불러오지 않고 ./util/get-emotion-images.js 모듈을 통해 불러왔다.
        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />

      </div>
      <div>
        <a href="/">Home</a>
        <a href="/diary">Diary</a>
        <a href="/new">New</a>
        기존 Server Side Rendering을 하던 a 태그를 이용한 페이지 이동

        <Link to={"/"}>Home</Link>
        <Link to={"/diary"}>Diary</Link>
        <Link to={"/new"}>New</Link>
        Client Side Rendering을 하는 Link component를 이용한 페이지 이동
      </div>

      <button onClick={onClickButton}>New 페이지로 이동</button>
      함수를 이용해서 특정 이벤트가 발생했을 때 Client Side Rendering으로 페이지를 이동 */}
      {/* <Header title={'Header'} leftChild={<Button text={'left'} />} rightChild={<Button text={'right'} />} />

      <Button
        // type={"DEFALUT"}
        // default type은 사실상 생략해도 무방함.
        text={"test"}
        onClick={() => {
          console.log("test 버튼 클릭");
        }}
      />
      <Button
        type={"POSITIVE"}
        text={"test"}
        onClick={() => {
          console.log("test 버튼 클릭");
        }}
      />
      <Button
        type={"NEGATIVE"}
        text={"test"}
        onClick={() => {
          console.log("test 버튼 클릭");
        }}
      /> */}
      {/* <button
        onClick={() => {
          onCreate(new Date().getTime(), 1, "새로 생성된 일기입니다.");
        }}
      >
        일기 추가 테스트
      </button>
      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다.");
        }}
      >
        일기 수정 테스트
      </button>
      <button
        onClick={() => {
          onDelete(1);
        }}
      >
        일기 삭제 테스트
      </button> */}

      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            {/* Routes component 사용시 주의사항
        1. Routes component 안에는 Route component만 들어갈 수 있다.
        2. Routes component 바깥에 배치한 요소들은 페이지 라우팅과는 관계없이 모든 페이지에서 항상 렌더링된다. (Routes component 안에 있는 요소들만 페이지 라우팅이 적용되기 때문에 바깥에 있는 요소들은 관계없이 계속 렌더링되어있는다.) */}
            <Route path="/" element={<Home />} />
            {/* path="/" 는 해당 사이트의 도메인만 입력했을 때 나오는 홈페이지이다 ex) naver.com, youtube.com  ,  사용자로부터 도메인주소/path 라는 입력이 들어오면 path를 작성해둔 코드들을 위에서부터 아래로 쭉 훑으며 매치하는 path값을 찾아서 사용자에게 해당 path 값을 가진 component를 렌더링해준다. */}
            <Route path="/new" element={<New />} />
            {/* path="/~~~" 는 해당 사이트의 특정 페이지에 들어갔을 때 해당 페이지를 나타내주는데 ex) youtube.com/short 같은 것.  */}
            <Route path="/diary/:id" element={<Diary />} />
            {/* /경로/:id => 동적 경로인 URL parameter를 이용하여 특정 id를 가진 페이지에 접근하는 방법 */}
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
            {/* path="*" 는 와일드카드로 위의 모든 path와 일치하지 않다면 path가 *인 component를 렌더링해준다. */}
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
