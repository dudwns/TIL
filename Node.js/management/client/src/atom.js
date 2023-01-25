import { atom } from "recoil";

export const isKeyword = atom({
  //atom은 고유한 key와 default 값을 요구
  key: "isKeyword",
  default: "",
});
