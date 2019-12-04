/**
 * Given a string describing a Javascript function, convert it to a Javascript function
 * (문자열로 표기된 자바스크립트 함수를 자바스크립트 Function 객체로 변환하는 법
 *
 * https://stackoverflow.com/questions/2573548/given-a-string-describing-a-javascript-function-convert-it-to-a-javascript-func
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval
 *
 * @type {{CalculateInfo: string}}
 */
// 샘플 데이터
let data = {
    "CalculateInfo" : "function sarf() { console.log(this); return 1 + 2; }"
};

// 1. 연산식을 바로 적용해서 결과 반환시키는 방법
let fn1 =new Function("return 1 + 2");
console.log(fn1());

let fn2 =new Function("{ var a = 5; var b = 3; return a + b }");
console.log(fn2());

// 2. Math 의 연산 메서드 사용하는 방법
let fn3 =new Function("{ return Math.abs(15.235) + Math.floor(20.1) }");
console.log(fn3());

let fn4 =new Function("{ return Math.PI }");
console.log(fn4());

/**
 * 주의사항 1 : eval 내부에선 var 로 선언된 변수만 받는다. let, const 는 지원되지 않음.
 * 주의사항 2 : eval 은 사용하지 마라
 *  -> 악의적인 코드 수행 가능성
 *      + 제3자 코드가 eval() 이 호출된 스코프 확인 가능
 *      + eval() 은 다른 대안들보다 느리다 (기계 코드에 해당 변수가 있는지 확인하고 값을 대입하기 위해 길고 무거운 변수명 검색을 수행함)
 *      + eval() 은 자료형 변경 등 변수에 변화가 일어날 수 있다
 */
// 3. function string 으로 되어 있는 것을 바로 실행하는 방법
eval("var fn11 = function() { return 1 + 2; }");
console.log(fn11());

// 4. object 내부에 value 로 기술되어 있는 function string 을 실행할 수 있게 만들고, 실행 처리하는 방법
eval("var fn12 = " + data["CalculateInfo"]);
console.log(fn12());


