// function Button (props) {
    // 부모 component App으로 받은 text={"메일"} color={"red"} 등과 같은 전달인자를 props라는 매개변수로 받아주었다. 이는 부모 component -> 자식 component로만 전달될 수 있다.
function Button ({text, color, children}) {
    // props에는 객체 형태의 데이터가 들어오니까 구조분해할당을 활용해 { } 안에 해당하는 property의 key를 넣어주는 방식으로 값을 받아왔다.
    // children이라는 props는 App.jsx의 카페 Button을 보면 닫는 태그를 직접 추가했고 그 사이에 <div>자식요소</div>를 넣어주었는데 이것이 전달된다.
    console.log(text)
    // {text: "메일"}
    // {text: '카페'}
    // {text: '블로그'}
    // 전달받은 props 값이 객체 property로 출력되는 모습

    const onClickButton = (a) => {
        console.log(a)
        // 합성이벤트객체 콘솔을 통해 해당 페이지에서 일어나는 이벤트에 대한 자세한 정보들을 알 수 있다!
        console.log(text)
    }
    return (
    <button 
        // onClick={() => {
        //     console.log(text)
        // }}
        // 위와 같이 작성해줘도 되고 onClickButton이라는 화살표 함수를 선언해주어서 아래와 같이 작성해도 된다.
        onClick={onClickButton}
        // 이벤트 핸들러 = 이벤트가 일어났을 때 실직적으로 처리하는 함수
        // onMouseEnter={onClickButton}
        // // onMouseEnter = 마우스가 해당 버튼에 올라갔을 때
    
        style={{color: color}}>{text} - {color.toUpperCase()}
        {children}
        {/* props의 key 값을 가져옴
        .toUpperCase()는 해당 문자열이 대문자로 작성되도록 함
        children은 App component에 있는 자식 요소를 가리키는 prop */}

    </button>
    )
}

Button.defaultProps = {
    // props의 기본값을 설정해주어 App.jsx에서 가져온 color 값이 없더라도 props.color에게 오류가 발생하지 않고 정상적으로 작동하도록 함.
    color: "black"
}

export default Button