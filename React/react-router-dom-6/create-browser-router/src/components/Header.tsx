import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate("/about"); //URL을 /about으로 변경
  };
  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>About</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;

//useNavigate(): URL을 이동시킨다.
//navigate(-1): 뒤로 가기
