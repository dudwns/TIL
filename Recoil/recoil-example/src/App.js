import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom } from "./atoms";

function App() {
  const [count, setCount] = useRecoilState(countAtom); //useState와 거의 유사하다. (atom을 통해 가져옴)

  /* const count = useRecoilValue(countAtom); //atom의 값을 받음
  const setCount = useSetRecoilState(countAtom); //atom을 변경할 수 있는 modifier를 받음
   */

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <span>{count}</span>
      <button onClick={handleIncrease}>count 증가</button>
    </>
  );
}

export default App;
