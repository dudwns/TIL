import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons"; // 아이콘 사용 패키지

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window"); // 스크린의 width, height 값을 가져옴

const API_KEY = "86ccc4c1951fe9562e2063e837c1140b";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); //사용자에게 위치 정보 허가를 요청
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 }); //사용자의 위치 정보를 얻음 (accuracy는 정확성)
    const location = await Location.reverseGeocodeAsync(
      // 위치의 도시 정보를 얻음
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    ); // 날씨 정보를 얻음
    const json = await response.json();
    setDays(json.list.filter((weather) => weather.dt_txt.includes("00:00:00")));
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        pagingEnabled //페이징 효과
        horizontal // 수평으로
        showsHorizontalScrollIndicator={false} //indicator을 숨김
        // indicatorStyle="white" // indicator의 style
        contentContainerStyle={styles.weather} // scrollView의 style
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>{day.main.temp.toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
              </View>

              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              <Text style={styles.date}>{day.dt_txt.slice(0, 10)}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: 500,
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    color: "white",
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: 500,
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: 500,
  },
  date: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
});

// view는 모두 기본적으로 flex container이다.
// React Native에서 flex direction의 기본값은 column이다. (웹은 row)
// 레이아웃을 만들때 width, height를 사용하지 않음, flex를 사용한다.
// ScrollView는 style이 아니라 contentContainerStyle을 사용해야 한다.
// ScrollView는 flex가 적용되지 않는다.
