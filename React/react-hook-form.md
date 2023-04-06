# React Hook Form

## React Hook Form이란?

React에서 form의 validation을 쉽고 빠르게 도와주는 라이브러리이다.
전체 폼이 리렌더링 되지 않으면서도 각각의 입력값 변화를 관찰할 수 있기에 성능도 빠르고 의존성 없이 쉽게 사용이 가능하다.

## 라이브러리 설치

```
npm install react-hook-form
```

React Hook Form 적용 전 Form 코드

```javascript
import { useState } from "react";

export default function Forms() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };

  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmailError("");
    setEmail(value);
  };

  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || email === "" || password === "") {
      setFormError("All fields are required");
    }
    if (!email.includes("@")) {
      setEmailError("이메일은 필수입니다.");
    }
    console.log(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={username}
        onChange={onUsernameChange}
        placeholder="Username"
        required
        minLength={5}
      ></input>
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        required
      ></input>
      {emailError}
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        required
      ></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
```

위 코드를 보면 input의 개수마다 state를 생성하고 연결시키며, validation을 지정해주고, 이벤트 함수를 생성하여 대입, 에러 처리 등 많은 일들을 해야한다.

하지만 React-Hook-Form을 사용하면 위 기능들을 쉽고 빠르게 구현할 수 있다.

React-Hook-Form의 기능을 이용하려면 useForm() 훅을 통해서 사용이 가능하다.

## register

input과 state를 연결시켜 주는 역할을 하는 함수

...register("고유 이름"): 객체 내부에 있는 속성들을 전부 가져다가 태그의 속성으로 넣어줌 (name, onBlur, onChange, ref)

```javascript
export default function Forms() {
  const { register } = useForm();
  return (
    <form>
      <input {...register("username")} type="text" placeholder="Username" required></input>
      <input {...register("email")} type="email" placeholder="Email" required></input>
      <input {...register("password")} type="password" placeholder="Password" required></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
```

## watch

Form이 수정될 때마다 보여주는 함수

```javascript
export default function Forms() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <form>
      <input {...register("username")} type="text" placeholder="Username" required></input>
      <input {...register("email")} type="email" placeholder="Email" required></input>
      <input {...register("password")} type="password" placeholder="Password" required></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
```

## Validation

HTML로 Validation을 설정하는 건 쉽게 변경될 수 있기 때문에, 자바스크립트로 설정하는 것이 좋다.

register의 두번째 인자로 설정할 수 있다.

조건이 충족되지 않았을 때 message도 작성할 수 있다. (onInvalid 함수의 인자로 전달됨)

## handleSubmit

onSubmit 함수와 같은 역할을 한다. 2개의 인자함수를 받는다. handleSubmit(onValid, onInvalid)

event.preventDefault() 가 필요 없다.

onValid: form이 유효할 때 실행되는 함수 (필수)

onInvalid: form이 유효하지 않을 때 실행되는 함수<br>

```javascript
export default function Forms() {
  const { register, handleSubmit } = useForm();

  const onValid = (data: LoginForm) => {
    //유효한 데이터 인자를 받음
    console.log(data);
  };
  const onInvalid = (errors: FieldErrors) => {
    // error 인자를 받음
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "5글자 이상이어야 합니다",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      ></input>
      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
      ></input>
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      ></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
```

form이 유효하지 않으면 자동으로 해당 input에 커서를 옮겨준다.

## Custom Validation

원하는 조건으로 유효성을 검사하고 싶으면 Validate 객체를 사용하면 된다.

```javascript
<input
  {...register("email", {
    required: "Email is required",
    validate: {
      notGmail: (value) => !value.includes("@gmail.com") || "Gmail은 사용하지 마세요",
    },
  })}
  type="email"
  placeholder="Email"
></input>
```

## error

formState의 errors 객체를 사용하면 onInvalid 함수 밖에서도 errors 객체를 사용할 수 있다.

error 메시지를 띄우는 것도 가능하다.

## mode

validation이 언제 실행될 지 정할 수 있다. (default는 "onSubmit")

```javascript
export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <
  LoginForm >
  {
    mode: "onChange", // 기본값은 onSubmit, (onSubmit일 때 validation 실행)
  };

  const onValid = (data: LoginForm) => {
    //유효한 데이터 인자를 받음
    console.log(data);
  };
  const onInvalid = (errors: FieldErrors) => {
    // error 인자를 받음
    console.log(errors);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "5글자 이상이어야 합니다",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      ></input>
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) => !value.includes("@gmail.com") || "Gmail은 사용하지 마세요",
          },
        })}
        type="email"
        placeholder="Email"
      ></input>
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      ></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
```
