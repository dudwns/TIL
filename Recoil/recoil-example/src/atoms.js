import { atom } from "recoil";

//atom을 구분해줄 고유의 값
//deatult는 해당 key값을 가진 atom의 기본값
export const userAtom = atom({
  key: "user",
  default: {
    id: "Admin",
    password: 1234,
  },
});

export const countAtom = atom({
  key: "count",
  default: 0,
});
