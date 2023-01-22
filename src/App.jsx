import { useState, useEffect, useContext, useRef, useReducer, useMemo } from 'react';
import './App.css';
import ShinCodeContext from './main';

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}
function App() {
  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(ShinCodeContext)
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () => {
    setCount(count + 1);
  };

  // 発火のタイミングを決めることができる
  // 第二引数に[]だとページをリロードした時に発火
  // [count]だとcountが更新したタイミングで発火される
  // 無限ループに注意（setCountを使うと無限）
  useEffect(() => {
    console.log("Hello Hooks")
  }, [count])

  const handleRef = () => {
    console.log(ref.current.value)
  }

  //useMemo メモ化できる。（ブラウザのメモリ上における）
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  //const square = () => {
  //  let i = 0;
  //  while (i < 200000000) {
  //    i++;
  //  }
  //  return count02 * count02;
  //}
  const square = useMemo(() => {
    let i = 0;
    while (i < 800000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
      <hr />
      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>
      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>
      <hr />
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <h1>useMemo</h1>
      <div>カウント１：{count01}</div>
      <div>カウント２：{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>
    </div>
  )
}

export default App
