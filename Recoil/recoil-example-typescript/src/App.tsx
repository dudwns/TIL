import { useRecoilState } from "recoil";
import { Iuser, userAtom } from "./atoms";

function App() {
  const [user, setUser] = useRecoilState<Iuser>(userAtom); //useState와 거의 유사하다. (atom을 통해 가져옴)

  return (
    <>
      <p>아이디: {user.id}</p>
      <p>비밀번호: {user.password}</p>
      <p>이름: {user.name}</p>
    </>
  );
}

export default App;
