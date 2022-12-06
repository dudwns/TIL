import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./atoms";
function App() {
  const [minute, setMinute] = useRecoilState(minuteState); //atom을 가져올땐 첫번째는 값, 두번째는 값을 수정하는 함수
  const [hours, setHours] = useRecoilState(hourSelector); //selector를 가져올땐 첫번째는 get함수의 값, 두번째는 set property를 실행시키는 함수
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinute(+event?.currentTarget.value); //앞에 + 붙이면 string을 number로 변환
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event?.currentTarget.value);
  };
  return (
    <div>
      <input type="number" placeholder="Minutes" onChange={onMinutesChange} value={minute} />
      <input type="number" placeholder="Hours" onChange={onHoursChange} value={hours} />
    </div>
  );
}

export default App;
