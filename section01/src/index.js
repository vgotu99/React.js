// // const moduleData = require('./math')
// const {add, sub} = require('./math')
// // Common JS를 이용하여 require('./math) = math 모듈을 연결해줌

// // console.log(moduleData.add(1, 2))
// console.log(add(1, 2))
// // 3

// // console.log(moduleData.sub(1, 2))
// console.log(sub(1, 2))
// // -1

// ======================================
// import multiply from "./math.js"
// math 모듈의 default인 multiply 함수를 가져왔다. default 값은 { }없이 가져올 수 있다.
// 아래처럼 default를 가져온 index 모듈에서 사용될 이름으로는 원하는 이름으로 변경 가능하다.
// import mul from "./math.js"

// import multiply, {add, sub} from "./math.js"
// ES module을 이용하여 math.js에서 add와 sub 함수를 가져왔다. 다만 from "" 으로 경로 설정시에 반드시 확장자까지 작성해주어야한다

// 위의 동일한 경로(./math.js)에서 값을 불러오는 여러개의 import문은 하나의 import문으로 통합해줄 수 있다. 아래처럼
import mul, {add, sub} from "./math.js"

// console.log(add(1, 2))
// // 3

// console.log(sub(1, 2))
// // -1

// console.log(mul(2, 3))
// // 6

import randomColor from "randomcolor"

const color = randomColor()
console.log(color)