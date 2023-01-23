import { post } from "axios";
import { useState } from "react";
import axios from "axios";
import { default as FormData } from "form-data";
function CustomerAdd({ stateRefresh }) {
  const [file, setFile] = useState(""); //바이트 형태의 데이터를 의미
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState(""); //보내고자하는 이미지의 파일명
  //파일 업로드 했을 때 동작하는 이벤트 함수
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  // /api/customers에 데이터를 전송
  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      //보내고자 하는 데이터의 파일 형식이 있으면 헤더를 작성해야 함
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config); //post형식으로 데이터를 보냄, (주소, 데이터, 설정)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.dir(response.data);
      stateRefresh();
    });
    setFile("");
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지:{" "}
      <input type="file" name="file" file={file} value={fileName} onChange={handleFileChange} />
      <br />
      이름:{" "}
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      생년월일:{" "}
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <br />
      성별:{" "}
      <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
      <br />
      직업: <input type="text" name="job" value={job} onChange={(e) => setJob(e.target.value)} />
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;
