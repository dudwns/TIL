import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form/dist/types";

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<LoginForm>({
    mode: "onChange", // 기본값은 onSubmit, (onSubmit일 때 validation 실행)
  });

  const onValid = (data: LoginForm) => {
    // 유효한 데이터 인자를 받음
    console.log(data);
    reset(); // 모든 form을 reset 시킴
  };
  const onInvalid = (errors: FieldErrors) => {
    // error 인자를 받음
    console.log(errors);
    setError("username", { message: "이미 있는 ID 입니다." }); // 특정 필드만 에러를 설정할 수 있음
  };
  console.log(watch());
  // setValue("username", "hello"); form의 value 제어

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
      {errors.username?.message}
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
