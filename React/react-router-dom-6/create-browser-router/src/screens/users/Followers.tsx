import { useOutletContext } from "react-router-dom";

interface IFollowersContext {
  nameOfMyUser: string;
}

function Followers() {
  const { nameOfMyUser } = useOutletContext<IFollowersContext>(); //Outlet의 context를 받을 때 사용하는 훅
  return <h1>Here are {nameOfMyUser}의 followers</h1>;
}
export default Followers;
