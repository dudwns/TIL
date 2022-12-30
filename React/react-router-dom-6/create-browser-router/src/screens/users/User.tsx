import { useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { userId } = useParams(); //URL의 dynamic parameter 정보를 알아낼 수 있음
  return (
    <h1>
      User with it {userId} is named: {users[Number(userId) - 1].name}
    </h1>
  );
}
export default User;

// useParams: Route path와 일치하는 현재 URL에서 동적 매개변수의 key/value 쌍 객체를 반환한다.
