# React Native

## 규칙

1. React Native는 웹사이트가 아니다. HTML 태그를 사용할 수 없음, `<div>` 대신 `<View>`를 사용

2. 모든 텍스트는 `<Text>` 컴포넌트 안에 들어가야 함

3. StyleSheet.create를 사용하는 이유는 아주 좋은 완성 기능을 제공함, 또한 컴포넌트와 따로 작성하면서 style이 거대해지는 것을 방지함

4. `<StatusBar>`는 화면에 렌더링 되지 않음 (시계, 와이파이, 배터리 등을 표시하는 운영체제와 소통하는 component)

## Component와 API의 차이점

Component: 화면에 렌더링 할 항목, return 내부에 포함시키는 것 ex) `<View>`, `<StatusBar>`

API: 자바스크립트 코드가 운영 체제와 소통하는 것 ex) Vibration

## react native packages에 관해서

초기 React Native 팀은 개발자들에게 최대한 많은 API와 Component를 제공하려고 했다.

하지만 유지 보수와 업데이트가 어렵다는 것을 깨달았다.

그 후 React Native 팀이 React Native를 유지하기 쉽고 빠르게 만드는 것에 집중하기 위해서 선택한 것은 예전에 제공했던 API, Component의 서비스 규모를 줄이는 것이었다.

그러므로 사라진 기능들을 개발자들에게 자체 패키지로 직접 만들어서 사용하는 것을 권유했고, 커뮤니티에서는 사라진 기능들을 제작하기 시작했다.

하지만 커뮤니티에서 제공하는 패키지는 오픈 소스이기 때문에 업데이트, 버그를 고치는 것에 한계가 있었다.

그래서 Expo는 React Native의 기능들을 복제하여 좀 더 개선된 버전으로 만들었다.

## Expo CLI

Expo-cli는 보편적인 React 애플리케이션을 위한 프레임워크이자 플랫폼이다.

동일한 JavaScript/TypeScript 코드베이스에서 iOS, Android 및 웹 앱을 개발, 빌드, 배포 및 빠르게 반복하는 데 도움이 되는 React Native 및 기본 플랫폼을 기반으로 구축된 도구 및 서비스 세트이다.

### Expo CLI 장점

- 초기 구성이 쉬어서 빠르고 간편하게 설치가 가능하며 React Native를 처음 개발하는 사람에게 편리하다.
- React Natvie를 위한 기본 설정이 미리 구성이 되었다는 장점이 있다.<br>
  네이티브 파일들을 개발자에게 숨겨두고 Expo가 자동으로 관리를 해준다
- Android / Xcode를 설치하지 않아도 QR코드를 통해서 해당 프로젝트를 실행 할 수 있게 해준다.
- Apple / Google Store에 배포와 업데이트를 하기에 간편하다.<br>
  배포마다 검사를 받지 않는다.<br>
  Expo Wrapper를 포함한 Standalone 앱 배포가 가능하다.

### Expo CLI 단점

- OS Layer와 상호작용이 불가능하다.<br>
  Java, kotlin, Object-C, Swiftf로 작성된 네이티브 모듈을 추가 할 수 없다.
- 일부 IOS 및 Andriod API를 사용할 수 없다.
- APP의 15 ~ 25MB로 기본 파일 크기가 크다
- 기능이 많은 앱 개발에는 부적합하다.
- 블루투스 이용 불가
- Eject 기능을 통해 설정하는 작업이 필요해서 오히려 번거러워질 수 있다.

### Expo CLI 설치

```
npm install --global expo-cli
```

### 프로젝트 만들기

```
expo init 프로젝트명
```

## ScrollView

스크롤이 필요할 때 사용하는 컴포넌트

```javascript
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
```

## Fontisto

아이콘 컴포넌트

사용법

```javascript
import { Fontisto } from "@expo/vector-icons"; // 아이콘 사용 패키지

...

return(
   <Fontisto name={icons[day.weather[0].main]} size={68} color="white" /> // 아이콘 렌더링
)

```

## touchable

### TouchableOpacity

터치 이벤트 발생 시 글자가 투명해진다.

```javascript
<TouchableOpacity>
  <Text style={styles.btnText}>Work</Text>
</TouchableOpacity>
```

### TouchableHighlight

터치 이벤트 발생 시 배경색이 바뀐다.

```javascript
<TouchableHighlight
  underlayColor="#DDDDDD" // 터치했을 때 배경색
  activeOpacity={0.5} // 투명도
  onPress={() => console.log("pressed")} // 이벤트
>
  <Text style={styles.btnText}>Travel</Text>
</TouchableHighlight>
```

### TouchableWithoutFeedback

Style 변경이 일어나지 않는다. (이벤트만 리스닝)

```javascript
<TouchableWithoutFeedback
  onPress={() => console.log("pressed")} // 이벤트
>
  <Text style={styles.btnText}>Travel</Text>
</TouchableWithoutFeedback>
```

### Pressable

더 섬세한 작업들을 할 수 있다.<br>
ex) 터치 범위를 확장하거나, 몇 초동안 누르고 있을 때 처리 등

```javascript
<Pressable
  onPress={() => console.log("pressed")} // 이벤트
>
  <Text style={styles.btnText}>Travel</Text>
</Pressable>
```

## TextInput

React Native에서 유일하게 키보드를 통해 입력값을 받을 수 있는 컴포넌트

```javascript
<TextInput
  // placeholderTextColor="red"
  // multiline  텍스트처럼 여러 줄로 쓸 수 있음(엔터 가능)
  // secureTextEntry 패스워드 입력할 때처럼 값을 숨김
  // keyboardType="number-pad" // 입력할 때 자판의 형식
  returnKeyType="done" // 리턴 버튼을    변경
  onSubmitEditing={addToDo} // submit 함수
  onChangeText={onChangeText} // 입력값을 받는 함수
  value={text}
  placeholder={working ? "할 일을 추가하세요" : "어디에 가고 싶습니까?"}
  style={styles.input}
/>
```

## AsyncStorage

Async Storage는 string 데이터만 저장할 수 있으므로 string개체 데이터를 저장하려면 먼저 직렬화해야 한다.<br>
JSON으로 직렬화할 수 있는 데이터의 경우 데이터를 저장할 때와 데이터를 로드할 때 사용할 수 있다.

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";
```

저장

```javascript
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    // saving error
  }
};
```

읽기

```javascript
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
```

## Alert

지정된 제목과 메시지로 경고 대화 상자를 띄운다.<br>
선택적으로 버튼 목록을 제공한다. 아무 버튼이나 누르면 각 onPress 콜백이 실행되고 경고가 사라진다. 기본적으로는 '확인' 버튼만 있다.

```javascript
const deleteToDo = (key) => {
  Alert.alert("삭제하시겠습니까?", "확실합니까?", [
    { text: "취소" },
    {
      text: "예",
      onPress: () => {
        const newToDos = { ...toDos };
        delete newToDos[key]; // 이 object는 아직 state에 있지 않기 때문에 mutate 해도 됨
        setTodos(newToDos);
        saveToDos(newToDos);
      },
    },
  ]);
};
```

## Expo Publishing

터미널에 `expo publish ` 실행하면 빌드가 되고 URL이 생긴다.

## React Native Web

React Native로 만든 코드를 웹에서도 빌드할 수 있다.<br>
`<View>`는 `<div>`, `<Text>`는 `<span>`로 자동으로 변경된다. (일반적인 HTML 코드로 바뀜)

툴 설치 명령어

```
npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
```

## Platform

어느 플랫폼에서 실행되고 있는지 확인할 수 있다.

```javascript
if (Platform.OS === "web") {
  const ok = confirm("삭제하고 싶은가요?"); //web에서는 confirm을 사용
  if (ok) {
    const newToDos = { ...toDos };
    delete newToDos[key]; // 이 object는 아직 state에 있지 않기 때문에 mutate 해도 됨
    setTodos(newToDos);
    await saveToDos(newToDos);
  }
} else {
  // web이 아니면 Alert를 사용
  Alert.alert("삭제하시겠습니까?", "확실합니까?", [
    { text: "취소" },
    {
      text: "예",
      onPress: async () => {
        const newToDos = { ...toDos };
        delete newToDos[key]; // 이 object는 아직 state에 있지 않기 때문에 mutate 해도 됨
        setTodos(newToDos);
        await saveToDos(newToDos);
      },
    },
  ]);
}
```

<hr>
## Create React Native App
Expo는 안드로이드와 ios 파일에 접근하지 못한다. 그래서 안드로이드와 ios 접근이 필요한 사람들은 Expo를 이용하지 않는다.

하지만 Create React Native App은 Native 접근 권한을 얻으면서 Expo의 SDK도 접근 가능하고 QR코드를 통한 프리뷰도 이용할 수 있다.

세팅들을 사전 생성해주는 ignite도 있다.

Create React Native App 시작하기
`npx create-react-native-app`

## AppLoading

preLoading 할 때 사용하는 컴포넌트
데이터 Loading 중에는 splash screen을 보여주고, loading이 끝나면 화면을 보여준다.

```javascript
export default function App() {
  const [ready, setReady] = useState(false);

  const onFinish = () => {
    setReady(true);
  };
  const startLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }; //splash screen을 비추고 있을 때 실행되는 함수, 끝나면 onFinish를 실행
  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return <Text>로딩 끝</Text>;
}
```

<hr>

### 안드로이드 실행

`npx react-native run-android`

<br>

### ios 실행

`npx react-native run-ios`

<br>

### Expo

- Expo 기능들을 사용할 수 있음
- 단 Native 파일에 접근할 수 없음

<br>

### react-cli

아무것도 설치되지 않은 기본 뼈대 프로젝트를 만들어준다. (비추천)

`npx react-native init AwesomeProject`

<br>

### crna

기본 뼈대 프로젝트를 만들어주지만 Expo의 기능들을 사용할 수 있다.
`npx create-react-native-app`

typescript로 프로젝트 생성
`npx create-react-native-app -t with-typescript`

장점

- Native 파일에 접근 권한을 가진 어플을 만들어줌.
- 동시에 Expo를 사용할 수 있음

<br>

### SplachScreen

해당 조건이 끝날 때까지 스플래쉬 화면을 보여주어 초기 화면을 감춘다.

`npx expo install expo-splash-screen`

<br>

### useFont, useAsset

폰트, 에셋 이미지를 preloader 할 때 사용

`npx expo install expo-font`

`npx expo install expo-asset`

```jsx
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./algorithm.png")]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync(); // 스플래시 스크린을 숨김
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Tabs />
    </NavigationContainer>
  );
}
```

<br>

### Navigate

`npm install @react-navigation/native`

expo를 같이 사용하고 있을 때 아래 명령어로 같이 실행

`npx expo install react-native-screens react-native-safe-area-context`

맥OS, ios 앱을 제작하고 있다면 아래 명령어도 실행

`npx pod-install ios`

<br>

### tab navigation

bottom-tabs 설치

`npm install @react-navigation/bottom-tabs`

```jsx
//App.js
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./algorithm.png")]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {" "}
      // 감싸주어야 함
      <Tabs />
    </NavigationContainer>
  );
}
```

```jsx
// Tabs.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    sceneContainerStyle={{ backgroundColor: isDark ? BLACK_COLOR : "white" }} // 스크린을 감싸는 컨테이너의 전역 스타일
    initialRouteName="Search" // 처음 화면이 될 스크린 이름
    screenOptions={{
      unmountOnBlur: true, // 스크린을 떠나면 해당 스크린의 state를 리셋
      tabBarStyle: { backgroundColor: "tomato" }, // 탭바 전체 스타일
      tabBarLabelStyle: {
        color: "red", // 텍스트 색상
        backgroundColor: "yellow", // 배경 색상
      },
      tabBarActiveTintColor: "red", // 활성화일 때 색상
      tabBarInactiveTintColor: "blue", // 비활성화일 때 색상
    }}
  >
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen
      name="Tv"
      component={Tv}
      options={{
        tabBarLabelStyle: {
          backgroundColor: "purple",
        },
        tabBarBadge: 5, // 알림 배지
        headerTitleStyle: { color: "tomato" }, // 헤더 스타일
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ), // 헤더 우측에 생성되는 컴포넌트
      }}
    />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
```

<br>

Tab Bar 아이콘 변경

```jsx
<Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="film-outline" color={color} size={size} />;
          },
        }}
/>
<Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="tv-outline" color={color} size={size} />;
          },
        }}
/>
<Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
            );
          },
        }}
/>
```

<br>

네비게이션 스크린 타입 적용하기

```jsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
  Detail: { originalTitle: string },
}; // root navigator의 type을 정의. screen name: params type

// screen 유형<root screen type, screen name>
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    setOptions({ title: originalTitle }); // title 변경
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
```

<br>

### 다크모드

useColorScheme로 다크모드 여부를 값으로 받을 수 있다.

```jsx
import { useColorScheme } from "react-native";

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GRAY : LIGHT_GRAY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};
```

<br>

만약 색상을 일일이 지정하기 귀찮으면 themes를 사용해 쉽고 간편하게 다크모드를 적용하는 방법도 있다.

```jsx
// App.js
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./algorithm.png")]);
  const isDark = useColorScheme() === "dark"; // 동일

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    // theme prop을 전달
    <NavigationContainer onReady={onLayoutRootView} theme={isDark ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  );
}
```

<br>

### Stack Nativation

- 새 screen이 이전 screen의 위로 올라오는 것
- 대부분의 어플리케이션은 Tab Bar와 Stack Nativation이 혼합되어있음

두 가지의 종류가 있다.

1. Stack Navigator

- 자바스크립트로 구현됨
- 커스텀을 자유롭게 가능
- 성능이 native보다 느림

1. Native Stack Navigator

- 커스텀은 가능하지만 Stack Navigator만큼은 아님, 하지만 충분하다.
- native API를 이용해 구현됨
- 안드로이드, ios의 방식으로 작동하고 퍼포먼스도 동일함

`npm install @react-navigation/native-stack`

```jsx
// stack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

// component에 전달된 모든 스크린은 navigation prop을 가짐
// 만약 컴포넌트가 스크린이 아니라면 useNavigation 훅을 사용하면 됨
const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    {" "}
    // Two로 이동
    <Text>Two로 가기</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    {" "}
    // Three로 이동
    <Text>Three로 가기</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { goBack, setOptions } }) => (
  <>
    <TouchableOpacity onPress={() => goBack()}>
      {" "}
      // 이전 스크린으로 이동
      <Text>뒤로 가기</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
      {" "}
      // header의 title을 변경
      <Text>title 변경</Text>
    </TouchableOpacity>
  </>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      animation: "fade", // 애니메이션 변경
      headerTintColor: YELLOW_COLOR, // 헤더 텍스트 색상
      headerBackTitleVisible: false, // 이전 스크린의 title 유무
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} options={{ presentation: "modal" }} />
  </NativeStack.Navigator>
);

export default Stack;
```

<br>

### Tab과 Stack을 합치기

root Navigator을 만들고 그 안에 두 Navigator를 나열한다.

```jsx
// Root.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

// presentation: Navigator 사이에 움직임 모션을 지정, headerShown: 헤더의 유무를 지정
const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default Root;
```

<br>

다른 Navigator로 이동할 때

`navigate(“Navigator 이름”, {screen: “이동할 스크린 이름”})`

```jsx
const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
);
```

<br>

다른 스크린에 props를 보낼 때

```jsx
// 같은 navigator에 있는 스크린으로 props를 보낼 때
navigation.navigate("Movie", { params: { originalTitle } });
// 다른 navigator에 있는 스크린으로 props를 보낼 때
navigation.navigate("Stack", { screen: "Detail", params: { originalTitle } });
```

### ReactNative에서 Styled-Components 사용하기

`npm install --save styled-components`

`npm install --save-dev @types/styled-components @types/styled-components-react-native`

<br>

tsconfig.json에 해당 항목 추가

```jsx
"types": ["jest", "styled-components-react-native"]
```

```jsx
import React from "react";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title selected={true}>Movies</Title>
    <Title selected={false}>Movies</Title>
  </Btn>
);

export default Movies;
```

<br>

### Styled-Components에서 다크모드 쉽게 구현하기

- 여러곳에서 다크모드의 유무값을 확인할 필요가 없다.
- 스타일을 지정할 때 조건문을 작성하지 않아도 된다.

1. 자바스크립트 오브젝트를 생성하여 테마별로 색상을 지정한다.

```jsx
// styled.js
export const lightTheme = {
  mainBgColor: "white",
  textColor: "#1e272e",
};

export const darkTheme = {
  mainBgColor: "#1e272e",
  textColor: "#d2dae2",
};
```

<br>

2. 어플리케이션을 ThemeProvider로 감싸주고 useColorScheme 훅으로 가져온 다크모드 유무값을 theme에 이용한다.

```jsx
//App.js
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./algorithm.png")]);
  const isDark = useColorScheme() === "dark";

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {" "}
      // ThemeProvider로 감싸줌
      <NavigationContainer onReady={onLayoutRootView}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
```

<br>

3. 모든 컴포넌트에서 theme에 접근할 수 있다.

```jsx
onst Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
```

<br>

### TypeScript 사용

styled.d.ts 파일 추가

```jsx
import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
  }
}

```

<br>

### Swiper 사용

`npm i --save react-native-swiper@next`

```jsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Views = styled.View`
  flex: 1;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => (
  <Container>
    <Swiper
      horizontal
      loop
      autoplay
      autoplayTimeout={3.5}
      showsButtons={false}
      showsPagination={false}
      containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
    >
      <Views style={{ backgroundColor: "red" }}></Views>
      <Views style={{ backgroundColor: "blue" }}></Views>
      <Views style={{ backgroundColor: "yellow" }}></Views>
      <Views style={{ backgroundColor: "purple" }}></Views>
    </Swiper>
  </Container>
);

export default Movies;
```

<br>

### Image blur 처리

`expo install expo-blur`

Mac OS는 추가로 `npx pod-install ios`

```jsx
<BgImg/>
<BlurView
	tint={isDark ? 'dark' : 'light'}
	intensity={95} // Blur 수치
	style={StyleSheet.absoluteFill} // position: absolute, width:100%, height:100% 축약어
>
	<Text>제목</Text>
</BlurView>
```

파일 시스템 외부에 있는 이미지 호출할 때

```jsx
<Poster source={{ uri: makeImagePath(movie.poster_path) }} />
```

<br>

### ScrollView vs FlatList

ScrollView

- 모든 자식 컴포넌트를 한번에 렌더링 하기 때문에 성능이 좋지 않다. (마지막 컴포넌트가 화면에 안보여도 렌더링 함)
- 따라서 데이터가 많을 때는 ScrollView를 사용하면 안 된다.

FlatList

- 컴포넌트가 화면에 나타나기 직전에 렌더링함 (lazy render)
- map 함수와 key가 필요없다. (map이 내부적으로 일어남)
- 무한 스크롤을 구현하기 쉬움

<br>

### ScrollView

```jsx
<ScrollView
  horizontal // 가로로 스크롤
  showsHorizontalScrollIndicator={false} // 막대기 제거
  contentContainerStyle={{ paddingLeft: 30 }} // 스크롤뷰의 컨테이너의 스타일을 줌
>
  {trending.map((movie) => (
    <VMedia
      key={movie.id}
      posterPath={movie.poster_path}
      originalTitle={movie.original_title}
      voteAverage={movie.vote_average}
    />
  ))}
</ScrollView>
```

<br>

### FlatList

필수 props

data는 렌더링 하고자하는 배열이어야 함

renderItem는 함수이고, 함수의 첫번째 인자는 현재 렌더링되고 있는 object이다.

```jsx
// 수직 스크롤뷰에 수직 스크롤뷰를 넣는건 불가능하기 때문에 ListHeaderComponent로 넣어야 함
<FlatList
			onRefresh={onRefresh} // refresh 함수
      refreshing={refreshing} // refresh boolean 값
			ListHeaderComponent={} // 해당 FlatList의 윗쪽 부분에 해당하는 컴포넌트를 넣음
      data={trending}
      horizontal // 가로로 스크롤
      keyExtractor={(item) => item.id} // 무엇을 key로 설정할 건지 (string만 가능)
      showsHorizontalScrollIndicator={false} // 막대기 제거
      contentContainerStyle={{ paddingHorizontal: 30 }} // 스크롤뷰의 컨테이너의 스타일을 줌
      ItemSeparatorComponent={() => <View style={{ width: 30 }} />} // 컴포넌트 사이를 구분하는 컴포넌트를 추가, 처음과 마지막은 제외
      renderItem={({ item }) => (
        <VMedia
          key={item.id}
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          voteAverage={item.vote_average}
        />
      )}
/>
```

<br>

### react-query

- 데이터를 캐싱할 수 있다. (fetch를 처음 mount될 때 한번만 실행)
- data, isLoading, error 객체를 받아올 수 있어서 코드가 간결해진다. (setState 필요 없음)

```jsx
 const {
    isLoading: nowPlayingLoading, // 처음 데이터를 fetching할 때의 로딩 상태
    data: nowPlayingData, //  fetching한 data
    refetch: refetchNowPlaying, // refetch 함수
    isRefetching: isRefetchingNowPlaying, // refetch 하고 있는지의 유무 상태
  } = useQuery({
    queryKey: ["movies", "nowPlaying"], // query key(데이터를 캐시에 담을 이름)
    queryFn: moviesApi.getNowPlaying, // fetch 함수
  });
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.getUpcoming,
  });
  const {
    isLoading: trendingLoaing,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery({
    queryKey: ["movies", "trending"],
    queryFn: moviesApi.getTrending,
  });

  const onRefresh = async () => {
    refetchNowPlaying();
    refetchUpcoming();
    refetchTrending();
  }; // 새로고침(refetch) 함수

  const loading = nowPlayingLoading || upcomingLoading || trendingLoaing; // 데이터 로딩 상태
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending; // refetch 상태

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh} // refresh 함수
      refreshing={refreshing} // refresh boolean 값
      ...
    />
```

<br>

refetch를 하는 또 다른 방법 (중복 제거)

다른 곳에서 온 데이터를 refetch할 수 있음 → queryClient를 사용

또한 refreshing state를 만들어야 불필요한 리렌더링이 안됨

```jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = useQueryClient(); // 모든 cache에 접근 가능
const [refetching, setRefetching] = useState(false);

const onRefresh = async () => {
  setRefetching(true);
  await queryClient.refetchQueries({ queryKey: ["movies"] }); // query key에 "movies"가 들어간 쿼리를 모두 refetch
  setRefetching(false);
}; // 새로고침(refetch) 함수
```

<br>

타입 작성할 때 꿀팁

```jsx
console.log(Object.keys(nowPlayingData?.results[0])); // key 가져오기
console.log(Object.values(nowPlayingData?.results[0]).map((v) => typeof v)); // value의 타입 가져오기
```

<br>

### react-query isLoading, isRefetching, isFetching 차이점

- isLoading: 처음 가져올 때 값이 변함. 또한 refetch했을 때의 데이터가 캐싱된 데이터가 아닐 때(기존 데이터와 다를 때) 변함
- isRefetching: 처음 가져올 때는 안 변함, refetch했을 때의 데이터가 캐싱된 데이터의 값과 동일할 때 변함
- isFetching: 처음 가져올 때 변함, refetch 할 때 변함(데이터가 동일한 지는 상관 없음)

<br>

### Remote 이미지 gradient 넣는법

`expo install expo-linear-gradient`

설치 후 mac OS거나 ios 개발 중일 때는 `npx pod-install ios`를 다시 실행

이후 종료하고 다시 빌드

```jsx
import { LinearGradient } from "expo-linear-gradient";

return (
  <Container>
    <Background
      style={StyleSheet.absoluteFill}
      source={{ uri: makeImagePath(params.backdrop_path || null) }}
    />
    <LinearGradient
      // Background Linear Gradient
      colors={["transparent", BLACK_COLOR]}
      style={StyleSheet.absoluteFill}
    />
    <Poster path={params.poster_path || null} />
  </Container>
);
```

<br>

### Link

1. 다른 앱에서 열고싶을 때는 Linking 사용
2. 앱을 벗어나지 않고다른 주소 페이지를 열려면 WebBrowser 사용

`npx expo install expo-web-browser`

`npx pod-install ios`

```jsx
import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

const openYTLink = async (videoID: string) => {
  const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
  await Linking.openURL(baseUrl); // 방법1. 다른 앱을 열고 이동
  await WebBrowser.openBrowserAsync(baseUrl); // 방법2. 앱 내에서 이동
};

return (
  <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
    <Ionicons name="logo-youtube" color="white" size={24} />
    <BtnText>{video.name}</BtnText>
  </VideoBtn>
);
```

<br>

### Share

```jsx
import { TouchableOpacity, Share, Platform } from "react-native";

return (
	// 공유 버튼 이벤트 함수
  const shareMedia = async () => {
    // 플랫폼이 안드로이드일 때
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`, // 안드로이드만 가능
        title: "original_title" in params ? params.original_title : params.original_name,
      });
    }
    // 플랫폼이 ios일 때
    else {
      await Share.share({
        url: isMovie ? `https://www.imdb.com/title/${data.imdb_id}` : data.hompage, // ios만 가능
        title: "original_title" in params ? params.original_title : params.original_name,
      });
    }
  };

  // 공유 버튼
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  // mount일 때는 데이터가 존재하지 않기 때문에 주의해야 함. (data가 존재할 때만 공유 버튼을 렌더링)
  // header는 state가 변경돼도 자동으로 리렌더링 되지 않음
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />, // data가 존재할 때 헤더 오른쪽에 컴포넌트를 리턴
      });
    }
  }, [data]);
)
```

<br>

### useInfiniteQuery

```jsx
const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage, // 다음 페이지 존재 여부 (boolean)
    fetchNextPage, // 다음 페이지를 fetch하는 함수
  } = useInfiniteQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.getUpcoming,
		initialPageParam: 1, // 처음 페이지 값
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      // 현재 페이지에서 1을 더한 값이 총 페이지 수보다 크면 null을 리턴. 작거나 같으면 현재 페이지에 1을 더해서 전달
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const loadMore = () => {
    if (hasNextPage) fetchNextPage(); // 다음 페이지가 존재하면 다음 페이지를 fetch
  };

  return (
	  <FlatList
        onEndReached={loadMore} // 사용자가 끝지점에 도달했을 때 실행하는 함수
        onEndReachedThreshold={0.4} // onEndReached를 실행시키려는 끝지점 (작성하지 않으면 기본값)
			  data={upcomingData?.pages.map((page) => page.results).flat()}
			  keyExtractor={(item) => item.id}
			  ItemSeparatorComponent={HSeparator}
			  renderItem={({ item }) => (
          <HMedia
            key={item.id}
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
        )}
  )

  // api
  // tanstack query가 자동적으로 pageParams를 계산해서 전달해줌
  getUpcoming: ({ pageParam }) => {
    console.log(pageParam);
    return fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
    ).then((res) => res.json());
  },
```

<hr>

## Interactions

### Animated

규칙

1. animation의 state는 절대 React의 state에 두지 않는다. Animated.Value()로 value 생성
2. Animated.Value 값은 절대 직접 수정하지 않는다.
3. 아무 컴포넌트나 Animate 할 수 없음. 컴포넌트를 Animated Component로 바꿔야한다.

만약 일반적인 styled-components를 사용하지 않으면 <Animated.View>형식으로 작성
아래 이외에 컴포넌트는 Animated.createAnimatedComponent()로 만들어야한다.

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

```jsx
import { Animated, Easing, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box); // Animated Component를 생성

export default function App() {
  const Y = new Animated.Value(0);
  const moveUp1 = () => {
    // 대부분 timing 사용. linear 함.
    Animated.timing(Y, {
      toValue: 200, // 어디까지 갈지
      useNativeDriver: true, // animation에 대한 모든 관련된 것이 native로 감. 따라서 bridge를 통할 필요가 없음(무조건 true)
      easing: Easing.circle, // 다양한 애니메이션 효과를 줌. (timing을 많이 사용하는 이유)
    }).start();
  };
  const moveUp2 = () => {
    // spring은 좀 더 물리학적인 것을 사용할 수 있다.
    Animated.spring(Y, {
      toValue: 200, // 어디까지 갈지
      bounciness: 20, // 이 옵션은 speed와 사용 가능
      speed: 30,
      tension: 300, // friction과 사용 가능
      friction: 15, // 마찰력
      useNativeDriver: true, // animation에 대한 모든 관련된 것이 native로 감. 따라서 bridge를 통할 필요가 없음(무조건 true)
    }).start();
  };

  // TouchableOpacity는 잘 적용되지 않음. onPress가 필요하기 때문에 감싸준다.
  return (
    <Container>
      <TouchableOpacity onPress={moveUp1}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
    </Container>
  );
}
```

위아래로 움직이기

- state를 설정할 때마다 React Component는 리렌더링된다.
- value가 초기값으로 돌아가지 않아야함 → useRef를 사용한다.

```jsx
export default function App() {
  const [up, setUp] = useState(false);
  const Y = useRef(new Animated.Value(0)).current; // 리렌더링이 일어나도 값을 유지
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200, // 어디까지 갈지
      useNativeDriver: true, // animation에 대한 모든 관련된 것이 native로 감. 따라서 bridge를 통할 필요가 없음(무조건 true)
    }).start(toggleUp);
  };
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
    </Container>
  );
}
```

<br>

### Interpolation

value의 기준 범위를 변환해준다. (어느 Input으로 다른 Output을 만듦)

[-300, 0 , 300] → [1, 0, 1]

또한 중간값을 가지게 됨 0.2, 0.3, 0.4, 0.5, 0.6…

animated value를 확인하고싶으면 아래와 같이 작성한다.

```jsx
yPosition.addListener(() => console.log(opacityValue));
```

상하 움직임 코드

```jsx
export default function App() {
  const [up, setUp] = useState(false);
  const yPosition = useRef(new Animated.Value(200)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 200 : -200, // 어디까지 갈지
      useNativeDriver: true, // animation에 대한 모든 관련된 것이 native로 감. 따라서 bridge를 통할 필요가 없음(무조건 true)
      duration: 3000, // 3초 동안
    }).start(toggleUp);
  };
  const opacity = yPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.5, 1],
  });
  const rotation = yPosition.interpolate({
    inputRange: [-200, 200], // input은 항상 number
    outputRange: ["-360deg", "360deg"], // output은 number가 아니어도 됨
  });
  const borderRadius = yPosition.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  const bgColor = yPosition.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            opacity,
            borderRadius,
            backgroundColor: bgColor,
            transform: [{ rotateY: rotation }, { translateY: yPosition }],
          }}
        />
      </Pressable>
    </Container>
  );
}
```

<br>

x축, y축 둘 다 사용할 때 (테두리를 도는 코드)

```jsx
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const position = useRef(
    new Animated.ValueXY({ x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100 })
  ).current;

  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true,
  });
  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true,
  });
  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true,
  });
  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true,
  });
  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  const moveUp = () => {
    //Animated.sequence([topLeft, bottomLeft, bottomRight, topRight]).start(); // animation의 배열. 순차적으로 한 번만 작동
    Animated.loop(Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])).start(); // 순차적으로 무한 반복
  };
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: position.getTranslateTransform(), // translate x와 y를 한번에 작성 [{ translateX: position.x }, { translateY: position.y }]
          }}
        />
      </Pressable>
    </Container>
  );
}
```

<br>

### PanResponder

손가락의 제스쳐나 움직임을 감지 (드래그)

```jsx
import { useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box); // Animated Component를 생성

export default function App() {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // 터치 event를 감지하기 시작
      onPanResponderMove: (_, { dx, dy }) => {
        // dx, dy는 터치가 시작된 위치에서 이동한 거리
        position.setValue({ x: dx, y: dy }); // animated value를 수동으로 변경할 수 있게 함
      }, // 손가락을 움직일 때 호출되는 함수
      onPanResponderRelease: () => {
        // position.setValue({ x: 0, y: 0 }); // transition 없이 바로 이동
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          bounciness: 10,
          useNativeDriver: true,
        }).start(); // 손가락을 떼면 제자리로 돌아가게 설정, transition 적용
      }, // 손가락을 떼면 호출되는 함수
    })
  ).current;
  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers} // 터치를 감지하기 위해 필요한 함수들을 전부 할당
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: position.getTranslateTransform(), // translate x와 y를 한번에 작성
        }}
      />
    </Container>
  );
}
```

<br>

드래그를 하고 다시 클릭할 때 제자리로 돌아오지 않게 하기 위해서는 offset을 사용해야한다.

다시 돌아오는 이유는 dy가 항상 0에서부터 시작하기 때문이다. (0에서 이동한 거리)

```jsx
import { useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box); // Animated Component를 생성

export default function App() {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // 터치 event를 감지하기 시작
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value, // -value를 해야 number 값을 가져옴
          y: position.y._value,
        }); // 이전에 위치한 값에서 이동을 시작
      }, // 손가락을 처음에 터치했을 때 호출되는 함수
      onPanResponderMove: (_, { dx, dy }) => {
        // dx, dy는 터치가 시작된 위치에서 이동한 거리
        position.setValue({ x: dx, y: dy }); // animated value를 수동으로 변경할 수 있게 함
      }, // 손가락을 움직일 때 호출되는 함수
      onPanResponderRelease: () => {
        position.flattenOffset(); // offset을 position에 넘겨주고 0으로 초기화
      }, // 손가락을 떼면 호출되는 함수
    })
  ).current;

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers} // 터치를 감지하기 위해 필요한 함수들을 전부 할당
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: position.getTranslateTransform(), // translate x와 y를 한번에 작성
        }}
      />
    </Container>
  );
}
```

<br>

위 코드 말고 onPanResponderRelease에 position.extracOffset()만 넣어줘도 동일하게 동작

```jsx
const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true, // 터치 event를 감지하기 시작
    onPanResponderMove: (_, { dx, dy }) => {
      // dx, dy는 터치가 시작된 위치에서 이동한 거리
      position.setValue({ x: dx, y: dy }); // animated value를 수동으로 변경할 수 있게 함
    }, // 손가락을 움직일 때 호출되는 함수
    onPanResponderRelease: () => {
      position.extractOffset(); // offset값을 기준 값으로 설정하고 0으로 재설정
    }, // 손가락을 떼면 호출되는 함수
  })
).current;
```

<br>

Card 애니메이션

```jsx
import { Animated, Dimensions, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import icons from "./icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const CardContainer = styled.View`
  flex: 3;

  justify-content: center;
  align-items: center;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  flex: 1;
`;

const Btn = styled.TouchableOpacity``;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [index, setIndex] = useState(0); // Card Index
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp", // inputRange 범위를 넘었을 때 동작을 정의. extend: 계속 진행, clamp: 더 이상 진행하지 않음
  }); // 앞에 카드가 300에 다다를수록 뒤에 카드의 크기가 점점 커짐

  const onPressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start(); // 터치를 시작했을 때
  const onPressOut = Animated.spring(scale, { toValue: 1, useNativeDriver: true }); // 손가락을 떼었을 때
  const goCenter = Animated.spring(position, { toValue: 0, useNativeDriver: true }); // 카드가 날라가지 않았을 때 다시 중앙으로 돌아옴
  const goLeft = Animated.spring(position, {
    toValue: -SCREEN_WIDTH - 100,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100, // 거리 임계치에 다다르면 애니메이션을 끝냄
    restSpeedThreshold: 100, // 속도 임계치에 다다르면 애니메이션을 끝냄
  }); // 왼쪽으로 날리기
  const goRight = Animated.spring(position, {
    toValue: SCREEN_WIDTH + 100,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100, // 거리 임계치에 다다르면 애니메이션을 끝냄
    restSpeedThreshold: 100, // 속도 임계치에 다다르면 애니메이션을 끝냄
  }); // 오른쪽으로 날리기
  const onDismiss = () => {
    scale.setValue(1); // 카드가 사라지고난 후 원래 크기인 1로 지정
    position.setValue(0); // 카드가 사라지고난 후 다시 제자리로 복귀
    setIndex((prev) => prev + 1); // Card Index를 1 증가
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn(),
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 200) {
          goRight.start(onDismiss);
        } else Animated.parallel([onPressOut, goCenter]).start(); // 동시에 실행되는 애니메이션을 작성
      },
    })
  ).current;

  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };
  return (
    <Container>
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [{ scale }, { translateX: position }, { rotateZ: rotation }], // translate를 rotate보다 먼저 작성
          }}
        >
          <Ionicons name={icons[index]} color="#192a56" size={98} />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
```

<br>

드래그 앤 드롭 애니메이션

```jsx
import { Animated, Dimensions, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import icons from "./icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;

export default function App() {
  // Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleOne = position.y.interpolate({
    inputRange: [-230, -80],
    outputRange: [1.5, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [80, 230], // 작은 값부터 작성
    outputRange: [1, 1.5],
    extrapolate: "clamp",
  });

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0, // 굳이 { x:0, y:0 } 라고 안해도 됨
    useNativeDriver: true,
  });

  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const goFastcenter = Animated.timing(position, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -180 || dy > 180) {
          Animated.sequence([Animated.parallel([onDropScale, onDropOpacity]), goFastcenter]).start(
            nextIcon
          );
        } else Animated.parallel([onPressOut, goCenter]).start();
      },
    })
  ).current;

  // State
  const [index, setIndex] = useState(0);

  const nextIcon = () => {
    setIndex((prev) => prev + 1);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }; // Icon Index를 1 증가시키고 scale, opacity를 원래대로 변경

  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleOne }] }}>
          <Word color={GREEN}>Yes</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name={icons[index]} color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleTwo }] }}>
          <Word color={RED}>No</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
```

<br>

## Realm

앱에서 몽고DB 사용하기

`npm install realm`

`npx pod-install ios`

```jsx
// App.tsx

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import Realm from "realm";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { DBContext } from "./context";

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState();

  const startLoading = async () => {
    try {
      const connection = await Realm.open({
        path: "diaryDB",
        schema: [FeelingSchema],
      });
      setRealm(connection);
    } finally {
      setReady(true);
    }
  }; // 스키마 정의

  useEffect(() => {
    startLoading();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <DBContext.Provider value={realm}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </DBContext.Provider>
    </View>
  );
}
```

```jsx
// context.ts
import React, { useContext } from "react";

export const DBContext = React.createContext(null);

export const useDB = () => {
  return useContext(DBContext);
};
```

```jsx
const realm = useDB();
const [feelings, setFeelings] = useState();
useEffect(() => {
  const feelings = realm.objects("Feeling"); // DB에서 데이터를 가져옴
  setFeelings(feelings);
  feelings.addListener((feelings, changes) => {
    setFeelings(feelings.sorted("_id", true)); // "_id"를 기준으로 데이터를 정렬. true는 내림차순
  }); // realm에 이벤트가 호출될 때마다 데이터를 새로 갱신
  return () => {
    feelings.removeAllListeners(); // useEffect에서는 현재 컴포넌트가 unmount되었을 때 실행되는 함수를 return해야 함
  };
}, []);

const onPress = (id) => {
  // 데이터 삭제
  realm.write(() => {
    const feeling = realm.objectForPrimaryKey("Feeling", id); // primary key를 기준으로 데이터를 찾음
    realm.delete(feeling);
  });
};
```

```jsx
// 데이터 삽입
realm.write(() => {
  realm.create("Feeling", {
    _id: Date.now(),
    emotion: selectedEmotion,
    message: feelings,
  });
```

<br>

## LayoutAnimation

- Animation을 만들 필요 없이 자동으로 레이아웃 변화에 애니메이션을 적용한다.
- setState가 발생할 때 작동

```jsx
import { FlatList, LayoutAnimation, TouchableOpacity } from "react-native";

return (
	const [state, setState] = useState();
	LayoutAnimation.linear(); // state에 어떤 변화가 생길 때 animate 하겠다.
	setState(state, newState);
)
```

<br>

## ReactNative에서 Firebase 사용하기

`npm install --save @react-native-firebase/app`

Firebase에서 프로젝트 생성 후 플랫폼 추가

### 안드로이드 플랫폼

- 패키지 이름 경로: android/app/build.gradle 파일에 defaultConfig 내부에 applicationId 존재
- SHA-1: 터미널에 cd android && ./gradlew signingReport 입력 후 Task :app:signingReport 찾은 후 SHA1 부분 복붙
- 앱 등록 후 google-services.json 다운 후 프로젝트 내 android/app에 드래그
- build.gradle에 각각 코드 삽입

## ios 플랫폼

- 번들 ID: vscode에서 ios 폴더 우클릭 후 Reveal in Finder 클릭 후 ios/플젝이름/xcworkspace 클릭 후 Bundle Identifire 입력
- 앲스토어에 등록된 앱이면 App Store ID 등록
- 파일 다운로드 후 xcode에서 우클릭, Add Files to ~ 클릭
- 파일 선택 후 Copy items if needed, Create groups 선택 후 Add 클릭
  - vscode에서 ios/프로젝트name/Appdelegate.mm 파일에 `#import <Firebase.h>` 추가
  - didFinishLaunchingWithOptions 함수 내에 `[FIRApp configure];` 추가
  - ios/Podfile 에 `use_frameworks! :linkage => :static` 추가
- `npx pod-install ios` 실행

## Authentication

`@react-native-firebase/auth`

`npx-pod install`

## Firebase Authentication

`npm i @react-native-firebase/auth`

`npx pod-install`

참고: ios앱에서는 소셜 로그인을 넣으려면 Apple ID 로그인도 필수로 있어야 함

### email/password 로그인

홈 화면

```jsx
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigator/InNav";
import OutNav from "./navigator/OutNav";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }); // 사용자 인증 상태의 변경 사항을 수신 (로그인 유무)
  }, []);
  return <NavigationContainer>{isLoggedIn ? <InNav /> : <OutNav />}</NavigationContainer>;
}
```

회원가입

```jsx
// join.js

import { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";
import { ActivityIndicator, Alert } from "react-native";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordInput = useRef();
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus(); // 이메일 입력 후 패스워드 인풋으로 포커스 이동
  };
  const onSubmitPasswordEditing = async () => {
    if (loading) return;
    if (email === "" || password === "") Alert.alert("이메일 혹은 패스워드를 입력해 주세요.");
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password); // 이메일과 패스워드를 넘김
    } catch (e) {
      switch (e.code) {
        case "auth/weak-password": {
          Alert.alert("비밀번호를 더 길게 작성하세요!"); // 이런 식으로 에러에 따라 예외 처리
        }
      }
    }
  };
  return (
    <Container>
      <TextInput
        placeholder="Email"
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        autoCapitalize="none" // 첫글자일 때 키보드를 대문자로 시작하는 걸 취소
        autoCorrect={false} // 자동완성 제거
        keyboardType="email-address" // 키보드에 @이 생김
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        secureTextEntry // 글자를 숨김
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? <ActivityIndicator color="white" /> : <BtnText>계정 생성 완료</BtnText>}
      </Btn>
    </Container>
  );
};

export default Join;
```

로그인 함수

```jsx
const login = async () => {
  await auth().signInWithEmailAndPassword(email, password); // email과 password로 로그인
};
```

로그아웃 함수

```jsx
const logOut = async () => {
  await auth().signOut(); // 로그아웃
};
```

<br>

## Victory Charts

시각화 차트 라이브러리

`npm install --save victory-native`

`npm install react-native-svg`

`npx pod-install`

```jsx
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Icon } from "../components/Coin";
import { useQuery } from "react-query";
import { history, info } from "../api";
import { BLACK_COLOR } from "../colors";
import { VictoryLine, VictoryChart, VictoryScatter } from "victory-native";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  const { isLoading: infoLoading, data: infoData } = useQuery({
    queryKey: ["coinInfo", id], // 이렇게 파라미터를 보내는게 캐시의 장점을 가질 수 있다.
    queryFn: info,
  });

  const { isLoading: historyLoading, data: historyData } = useQuery({
    queryKey: ["coinHistory", id],
    queryFn: history,
  });

  const [victoryData, setVictoryData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://coplore-icon-api.vercel.app/api/icons/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({ x: new Date(price.timestamp).getTime(), y: price.price })) // {x: 시간 y: 가격} 형태로 만듦
      );
    }
  }, [historyData]);

  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interforlation="monotoneX"
            data={victoryData}
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter data={victoryData} style={{ data: { fill: "#1abc9c" } }} />
        </VictoryChart>
      ) : null}
    </Container>
  );
};

export default Detail;
```
