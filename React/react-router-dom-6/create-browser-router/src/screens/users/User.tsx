import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { userId } = useParams(); //URL의 dynamic parameter 정보를 알아낼 수 있음
  return (
    <div>
      <h1>
        User with it {userId} is named: {users[Number(userId) - 1].name}
      </h1>
      {/* /를 쓰지 않으면 상대경로, /followers는 절대경로 */}
      <Link to="followers">See followers</Link>
      <Outlet
        context={{
          nameOfMyUser: users[Number(userId) - 1].name,
        }}
      />
    </div>
  );
}
export default User;

// useParams: Route path와 일치하는 현재 URL에서 동적 매개변수의 key/value 쌍 객체를 반환한다.
// Outlet: 자식이 있으면 자식을 렌더링, context: 하위 경로와 state 또는 기타 값을 공유한다.
