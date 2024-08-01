import useInput from '../hooks/useInput'

// Hook 관련 3가지 팁
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건문, 반복문 내부에서 호출될 수 없다.
// 3. 나만의 훅(Custom Hook)을 직접 만들 수 있다.

const HookExam = () => {

    // const state = useState();
    // 함수 컴포넌트 안에서 호출된 Hook (가능)

    // if {
    //     const state = useState()
    // }
    // 조건문에서 Hook을 호출했더니 오류가 발생함
    // for () {
    //     const state = useState()
    // }
    // 반복문에서 Hook을 호출했더니 오류가 발생함    

    const [input, onChange] = useInput()
    // custom hook인 useInput의 input과 onChange함수를 구조분해할당하여 받아왔다.

    
    // const [input, setInput] = useState()
    // const onChange = (e) => {
    //     setInput(e.target.input)
    // }
    // input이 들어올 때마다 반복적으로 동작하기에 custom hook으로 만들어 ../hooks/useInput.jsx에 분리하였다.

    return <div>
        <input value={input} onChange={onChange}></input>
    </div>
}

export default HookExam