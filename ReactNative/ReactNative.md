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
