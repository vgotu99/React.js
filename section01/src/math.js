// math module
// function add(a, b) {
//     return a + b
// }

// function sub(a, b) {
//     return a - b
// }

// module.exports = {
//     // add: add,
//     add,
//     // sub: sub
//     sub
// }
// // CommonJS를 이용하여 math 모듈을 다른 모듈에서 사용하기 위해 add와 sub 함수를 밖으로 내보내줌

// ======================================

// function add(a, b) {
//     return a + b
// }


// function sub(a, b) {
//     return a - b
// }

// export {add, sub}
// // ES module을 이용하여 math 모듈의 add와 sub 함수를 밖으로 내보내주어 다른 모듈에서 사용 가능하게 함

// 아래처럼 함수 선언문 앞에 export 키워드를 추가해서 export할 수도 있다.

export function add(a, b) {
    return a + b
}


export function sub(a, b) {
    return a - b
}

export default function multiply (a, b) {
    return a * b
}
// export default는 해당 함수를 default로 내보내주어 math 모듈을 대표하는 단 하나의 기본값이 되며 import시에도 { } 없이 해당 함수를 불러올 수 있다.