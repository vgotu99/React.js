import { useState } from "react"

// Custom Hook

function useInput() {
    // custom hook은 use함수명 으로 만들어줄 수 있다. 또한 다른 hook을 내부에서 호출하는 것도 가능하다.
    const [input, setInput] = useState("")
    const onChange = (e) => {
        setInput(e.target.input)
    }

    return [input, onChange]
}
// custom Hook을 사용하는 예시
// 위 input 처럼 component마다 반복되어 동작하는 로직이 내부에 있는 hook인 경우 custom Hook을 이용하여 함수 component 밖으로 분리해줄 수 있으며 이런 custom hook은 여러번 반복하여 사용할 수 있다.

export default useInput