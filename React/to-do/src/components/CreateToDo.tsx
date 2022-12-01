import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>(); //setValue()는 값을 설정할 수 있음
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldTodos]);
    setValue("toDo", ""); //toDo를 빈 문자열로 변경
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo", { required: "Please write a To do" })} placeholder="Write a to do" />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
