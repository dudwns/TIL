import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isKeyword } from "../atom";

const Nav = styled.div`
  background-color: rgb(62, 80, 181);
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;

  & > ul {
    display: flex;
  }
  & > ul > li > svg {
    fill: whitesmoke;
    height: 15px;
    width: 15px;
  }
`;

const Title = styled.div`
  color: whitesmoke;
  margin-left: 25px;
`;

const Search = styled.form`
  display: flex;
  position: relative;
  align-items: center;

  & svg {
    width: 15px;
    height: 15px;
    position: absolute;
    z-index: 3;
    right: 170px;
    fill: whitesmoke;
  }
`;

const Input = styled.input`
  position: absolute;
  right: 10px;
  text-align: center;
  border: none;
  opacity: 0.3;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
`;

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useRecoilState(isKeyword);
  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
    console.log(searchKeyword);
  };

  return (
    <>
      <Nav>
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </li>
          <li>
            <Title>고객 관리 시스템</Title>
          </li>
        </ul>

        <Search onSubmit={(e) => e.preventDefault()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
          <Input
            placeholder="검색하기"
            name="searchKeyword"
            value={searchKeyword}
            onChange={handleValueChange}
          ></Input>
        </Search>
      </Nav>
    </>
  );
};

export default Header;
