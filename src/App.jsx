import { useState, useEffect, useContext, useRef, useReducer } from 'react';
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


  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
      <hr />
      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

    </div>
  )
}

export default App
