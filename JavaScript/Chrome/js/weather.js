const API_KEY = "86ccc4c1951fe9562e2063e837c1140b";

function onGeoOK(position) {
  //위치 정보가 담긴 인자를 받음
  const lat = position.coords.latitude; //위도
  const lon = position.coords.longitude; //경도
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather div:first-child");
      const city = document.querySelector("#weather div:last-child");
      weather.innerText = `날씨: ${data.weather[0].main} / ${data.main.temp} °C`;
      city.innerText = `지역: ${data.name}`;
    }); //API를 불러옴, fetch는 promise(당장 일어나지 않고 시간이 좀 걸린 뒤에 일어남)
}

function onGeoError() {
  alert("Can't find you no weather for you.");
}

//현재 위치를 알 수 있음, 첫번째 인자는 성공했을 때 실행하는 함수, 두번째 인자는 실패했을 때 실행하는 함수
navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
