import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[]; //나중에 user가 board를 만들 수도 있으니까 굳이 to_do, doning, done로 고정하지 않음
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To do": [],
    Doning: [],
    Done: [],
  },
});
