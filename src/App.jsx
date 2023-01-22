import { useState, useEffect, useContext } from 'react';
import './App.css';
import ShinCodeContext from './main';

function App() {
  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(ShinCodeContext)
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

  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
      <hr />
      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>
    </div>
  )
}

export default App
