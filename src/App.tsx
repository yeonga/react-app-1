import React, { useEffect, useState } from 'react';
import './App.css';
import countStyle from "./App.module.css";   // 여기서 사용한 countStyle은 아무 변수명으로 바꿔도 됨
type CounterProps = {
  title: String;
  // ?를 사용하는 이유는 있을 수도 있고 없을 수도 있을 때 사용 (그치만 typescript에서는 값이 없을 때(undefined)는 타입을 알 수 없으므로 명확히 해주는게 좋음)
  initValue?: number;
}

type CounterProps2 = {
  title : String;
  initValue : number;
}

// 오른쪽과 같이 사용하면 typescript를 무시한다는 뜻이다. 타입 에러가 날 때 사용할 수 있지만 정확한 타입을 위처럼 적어줘야한다.  // @ts-ignore
function Counter(props : CounterProps) {
//  const countState = useState(50);  // useState를 하면 배열이 만들어짐
//  const count = countState[0];      // 0번째는 그 값 자체 (처음에 정함 50이 됨)
//  const setCount = countState[1];   // 1번째는 배열
//  이 위의 세 줄이 아래 한 줄로 줄여짐
  const [count, setCount] = useState(50);
  const [step, setStep] = useState(1);
  useEffect(() => {
    fetch("http://localhost:9999/counter")
    .then((res) => res.json())
    .then((result) => {
      setCount(result.value);
    });
  }, [step]);

//  useEffect(() => {
//    fetch("http://localhost:9999/counter")
//    .then((res) => res.json())
//    .then((result) => {
//      setCount(result.value);
//    });
//  }, [step]); // step의 값이 바꼈을 때만 다시 호출된다. 배열 안에 두 개의 값이 있다면 둘 중 하나라도 바뀌면 다시 호출된다.

function up() {
  // setCount(count+1);
  const url = "http://localhost:9999/counter";
  const body = JSON.stringify({ value: count+1 });
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body,
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

//  function up() {
//    setCount(function(oldCount) {
//      return oldCount + 1;
//    });
// 위의 setCount 함수와 아래 setCount와 같은 것.
// setCount는 함수로 올 수도 있고 값으로 올 수도 있다.
//    setCount(count + 1);
// 위의 setCount를 아래처럼 arrow function으로 사용할 수 있음
//  setCount(oldCount => oldCount + 1);
//  }

  return (
  <div className={countStyle.layout}>
    <h1 style={{
    color : "red",
    backgroundColor : "yellow"
  }}>{props.title}</h1>
    <button className="btn" onClick={up}>+</button> 👉🏻 {count}
  </div>
  );
}

function Counter2({title, initValue} : CounterProps2) {
return (
  <>
    <h1>{title}</h1>
    <button>+</button> 👉🏻 {initValue}
  </>
);
}

type YeongProps = {
  title : String;
  initValue: number;
}

function Yeonga(props : YeongProps) {
  const[count, setCount] = useState(props.initValue);
  function up() {
    setCount((oldCount) => oldCount +1);
  }
  const yeongStyle = {
    color : "white",
    backgroundColor : "blue"
  }
  return (
    <>
      <h1 style={yeongStyle}>{props.title}</h1>
      <h2>{props.initValue}</h2>
      <button onClick={up}>+</button> 👉🏻 {count}
    </>
  );
}

function App() {
  return (
    <div>
      <Counter title="참가자 카운터" initValue={10}></Counter>
      <Counter title="불면증 카운터" initValue={100}></Counter>
      <Counter2 title="참가자 카운터2" initValue={10}></Counter2>
      <Counter2 title="불면증 카운터2" initValue={100}></Counter2>
      <Yeonga title="I am YEONG-A. I am " initValue={27}></Yeonga>
    </div>
  );
}

export default App;
