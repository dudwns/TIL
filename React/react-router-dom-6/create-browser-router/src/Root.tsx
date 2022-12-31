import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet context={{ darkMode: true }} /> {/* 모든 자식들에게 이 데이터를 공유 */}
    </div>
  );
}

export default Root;

//<Outlet/> : URL을 보고 일치하는 자식을 렌더링
