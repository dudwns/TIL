import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[]; //나중에 user가 board를 만들 수도 있으니까 굳이 to_do, doning, done로 고정하지 않음
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To do": ["a", "b"],
    Doning: ["c", "d", "e"],
    Done: ["f"],
  },
});
