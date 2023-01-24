import { post } from "axios";
import { useState } from "react";
import axios from "axios";
import { default as FormData } from "form-data";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const JoinForm = styled.div`
  border: 1px solid black;
  width: 700px;
  height: 600px;
  position: fixed;
  top: 5%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #2f2f2f;
  border-radius: 10px;
  display: ${(props) => (props.value ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
  & div {
    margin-bottom: 50px;
  }
  & h1 {
    margin-bottom: 80px;
  }
  & button {
    background-color: whitesmoke;
    padding: 5px;
    border-radius: 10px;
    width: 100%;
    font-size: 20px;
    cursor: pointer;
    margin-top: 40px;
  }

  & input {
    border-radius: 5px;
  }
`;

const JoinContent = styled.div`
  width: 500px;
`;

const Gender = styled.input`
  margin-left: 20px;
`;

const CloseBtn = styled.svg`
  width: 20px;
  position: absolute;
  top: -40px;
  right: 20px;
  fill: whitesmoke;
  cursor: pointer;
`;

const AddBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & button {
    width: 300px;
    padding: 5px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
  }
`;

function CustomerAdd({ stateRefresh }) {
  const [file, setFile] = useState(""); //바이트 형태의 데이터를 의미
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState(""); //보내고자하는 이미지의 파일명

  const [open, setOpen] = useState(false);

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
    <Container>
      <AddBtn>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          회원 등록하기
        </button>
      </AddBtn>

      <JoinForm value={open}>
        <JoinContent>
          <CloseBtn
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>
          </CloseBtn>
          <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            <div>
              이름:{" "}
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <span style={{ marginLeft: "50px" }}>
                성별:{" "}
                <Gender
                  type="radio"
                  name="gender"
                  value="남"
                  onClick={(e) => setGender(e.target.value)}
                />
                남
                <Gender
                  type="radio"
                  name="gender"
                  value="여"
                  onClick={(e) => setGender(e.target.value)}
                />
                여
              </span>
            </div>

            <div>
              생년월일:{" "}
              <input
                type="date"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div>
              직업:{" "}
              <input type="text" name="job" value={job} onChange={(e) => setJob(e.target.value)} />
            </div>
            <div>
              프로필 이미지:{" "}
              <input
                type="file"
                name="file"
                file={file}
                value={fileName}
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              onClick={() => {
                setOpen(false);
              }}
            >
              추가하기
            </button>
          </form>
        </JoinContent>
      </JoinForm>
    </Container>
  );
}

export default CustomerAdd;
