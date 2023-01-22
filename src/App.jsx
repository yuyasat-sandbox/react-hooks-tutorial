import { useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import ShinCodeContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';

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

  //useMemo メモ化できる。（ブラウザのメモリ上における）値をメモ化する。
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
    while (i < 80000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  //useCallback 関数をメモ化する。
  const [counter, setCounter] = useState(0);
  const showCount = () => {
    alert('これは思い処理です。');
  }
  // const showCount = useCallback(() => {
  //   alert('これは思い処理です。');
  // }, [counter]);

  // カスタムフック
  const [age, setAge] = useLocalStorage("age", 24);


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
      <hr />
      <h1>useCallback</h1>
      <SomeChild showCount={showCount} />
      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => { setAge(80) }}>年齢をセット</button>
    </div>
  )
}

export default App
