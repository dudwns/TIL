import { atom } from "recoil";

export interface Iuser {
  id: string;
  password: number;
  name: string;
}

//atom을 구분해줄 고유의 값
//deatult는 해당 key값을 가진 atom의 기본값
export const userAtom = atom<Iuser>({
  key: "user",
  default: {
    id: "Admin",
    password: 1234,
    name: "홍길동",
  },
});
