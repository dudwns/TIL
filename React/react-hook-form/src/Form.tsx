import React, { useState } from "react";
import { useForm } from "react-hook-form"; //useForm 사용하기 위해 import

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //const value = event.currentTarget.value와 같은 것
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Write a to do" value={toDo} onChange={onChange} />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  first_Name: string;
  last_Name: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function Form() {
  //register()는 name, value, onChange, onBlur를 가지고 있음, watch()는 우리의 form의 입력값을 추적
  //여러개의 state와 event를 만들 필요 없음
  //handleSubmit()는 validaton을 담당
  //formState는 form의 state가 들어있음 (errors 객체도 가지고 있음)
  //setError는 특정한 에러를 발생시키게 해줌
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com", //form에 기본값을 설정
    },
  });
  const onValid = (data: IForm) => {
    //password가 password1과 같지 않을 때 에러 발생
    if (data.password !== data.password1) {
      setError("password1", { message: "Password are not the same" }, { shouldFocus: true }); //첫번째는 에러가 발생하는 폼, 두번째는 에러 메세지, 세번째는 포커스 이동 여부
    }
    // setError("extraError", { message: "Server offline" });
  };
  console.log(errors); //errors 객체를 보여줌

  return (
    <div>
      {/*handleSubmit()은 두개의 인자를 받음, 첫번째는 데이터가 유효할 때 호출되는 함수, 두번째는 데이터가 유효하지 않을 때 호출되는 함수 */}
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: "Email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Only naver.com emails allowed" } })} placeholder="Email" />
        <span>{errors?.email?.message}</span>
        <input
          {...register("first_Name", {
            required: "write here",
            validate: {
              noNico: (value) => !value.includes("nico") || "no nicos allowed", //nico가 포함되면 에러를 표시
              noNick: (value) => !value.includes("nick") || "no nicks allowed", //nick이 포함되면 에러를 표시
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.first_Name?.message}</span>
        <input {...register("last_Name", { required: "write here" })} placeholder="Last Name" />
        <span>{errors?.last_Name?.message}</span>
        <input {...register("username", { required: "write here", minLength: 10 })} placeholder="Username" />
        <span>{errors?.username?.message}</span>
        <input {...register("password", { required: "write here", minLength: 5 })} placeholder="Password" />
        <span>{errors?.password?.message}</span>
        <input {...register("password1", { required: "Password is required", minLength: { value: 5, message: "your password is too short" } })} placeholder="Password1" />
        <span>{errors?.password1?.message}</span>
        {/* 조건과 메시지를 전달 가능
        validate는 함수로 값을 받는데 특정 단어를 금지시킬 수 있음, ex) nico가 포함되면 에러를 표시
        */}
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default Form;
