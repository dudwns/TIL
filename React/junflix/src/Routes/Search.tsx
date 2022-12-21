import { useLocation } from "react-router";

function Search() {
  const location = useLocation(); //useLocation(): 지금 있는 곳에 관한 정보를 얻을 수 있음
  const keyword = new URLSearchParams(location.search).get("keyword"); //URL에서 특정 쿼리 문자열을 가져오거나 수정할 때 사용한다.
  console.log(keyword);
  return null;
}
export default Search;
