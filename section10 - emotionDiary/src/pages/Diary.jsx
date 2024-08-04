import { useParams } from "react-router-dom"
// useParams: 동적경로인 URL parameter의 값을 가져오는 기능을 하는 커스텀 훅.

const Diary = () => {
    const params = useParams()
    console.log(params)

    return <div>{params.id}번 일기입니다 ~~~~~~~~</div>
}

export default Diary