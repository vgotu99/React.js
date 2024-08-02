import { useEffect } from "react"

const Even = () => {
    useEffect(() => {

        // useEffect의 콜백함수 내에서 return으로 다시 또 함수를 반환하는 함수(아래 return 화살표함수) = 클린업, 정리함수 라고 부름
        // 이러한 정리함수(=클린업)는 useEffect가 끝날 때(unmount될 때) 실행된다
        return () => {
            console.log('unmount')
        }
    }, [])
    return <div>짝수입니다</div>
}

export default Even