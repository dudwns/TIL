# React Native

## 규칙

1. React Native는 웹사이트가 아니다. HTML 태그를 사용할 수 없음, <div> 대신 <View>를 사용, 항상 import 해야함
   `import { StyleSheet, Text, View } from "react-native";`

2. 모든 텍스트는 <Text> 컴포넌트 안에 들어가야 함

3. StyleSheet.create를 사용하는 이유는 아주 좋은 완성 기능을 제공함, 또한 컴포넌트와 따로 작성하면서 style이 거대해지는 것을 방지함

4. <StatusBar>는 화면에 렌더링 되지 않음 (시계, 와이파이, 배터리 등을 표시하는 운영체제와 소통하는 component)

## react native packages에 관해서

초기 React Native 팀은 개발자들에게 최대한 많은 API와 Component를 제공하려고 했다.
하지만 유지 보수와 업데이트가 어렵다는 것을 깨달았다.
그 후 쉽게 React Native를 유지하기 쉽고 빠르게 만드는 것에 집중하기 위해서 선택한 것은 예전에 제공했던 API, Component의 서비스 규모를 줄이는 것이었다.
그러므로 사라진 기능들을 개발자들에게 자체 패키지로 직접 만들어서 사용하는 것을 권유했고, 커뮤니티에서는 사라진 기능들을 제작하기 시작했다.
하지만 커뮤니티에서 제공하는 패키지는 오픈 소스이기 때문에 업데이트, 버그를 고치는 것에 한계가 있다.
그래서 Expo는 React Native의 기능들을 복제하여 좀 더 개선된 버전으로 만들었다.

## Component와 API의 차이점

Component: 화면에 렌더링 할 항목, return 내부에 포함시키는 것 ex) <View>, <StatusBar>
API: 자바스크립트 코드가 운영 체제와 소통하는 것 ex) Vibration
