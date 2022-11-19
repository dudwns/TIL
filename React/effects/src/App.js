import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("created :)"); //생성될 때 실행
    return () => console.log("destroyed :("); //Cleanup, 파괴될 때 실행
  },[]);

  return <h1>Hello</h1>;
}

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);

  const onClick1 = () => setShowing((prev) => !prev);

  const onClick = () => {
    setValue((prev) => prev + 1);
  };
  const onChange = (event) => setKeyword(event.target.value);

  console.log("i run all the time");
  
  useEffect(() => {
    console.log("CALL THE API....");
  }, []); //처음 한번 렌더링 되고 그 다음부터 렌더링 되지 않음

  useEffect(() => {
    if(keyword !=="" && keyword.length > 5){ //keyword가 공백이 아니고 6글자 이상일 때만 실행
      console.log("I run when 'keyword' changes.");
    }
  },[keyword]); //두번째 인자는 내가 원할 때 코드를 실행시킬 수 있음 (keyword가 바뀔 때만)

  useEffect(() => {
      console.log("I run when 'counter' changes.");
    }
  ,[counter]); //counter가 바뀔 때마다 실행

  useEffect(() => {
    console.log("I run when keyword & counter changes.");
  }, [keyword, counter]);      //keyword랑 counter가 바뀔 때마다 실행

  return (
   <div>
    <input value={keyword} type="text" onChange={onChange} placeholder="Search here..." />
    <h1>{counter}</h1>
    <button onClick={onClick}>click me</button>

    {showing ? <Hello/> : null}
    <button onClick={onClick1}>{showing ? "Hide" : "Show"}</button>
   </div>
  );
}

export default App;
