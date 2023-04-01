import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const WORKIN_KEY = "@working";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState({});
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadMenu();
    loadToDos();
  }, []);

  const work = async () => {
    setWorking(true);
    try {
      await AsyncStorage.setItem(WORKIN_KEY, "true"); // 스토리지에 저장 (String만 가능, await 꼭 사용해야함)
    } catch (e) {
      console.log(e);
    }
  };

  const travel = async () => {
    setWorking(false);
    try {
      await AsyncStorage.setItem(WORKIN_KEY, "false"); // 스토리지에 저장 (String만 가능, await 꼭 사용해야함)
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeText = (payload) => {
    setText(payload);
  };

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave)); // 스토리지에 저장 (String만 가능, await 꼭 사용해야함)
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      setTodos(JSON.parse(s));
    } catch (e) {
      console.log(e);
    }
  };

  const loadMenu = async () => {
    try {
      const s = await AsyncStorage.getItem(WORKIN_KEY);
      s === "true" ? setWorking(true) : setWorking(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // const newToDos = Object.assign({}, toDos, { [Date.now()]: { text, work: working } }); // 이전 toDos를 새로운 toDos랑 결합
    const newToDos = { ...toDos, [Date.now()]: { text, working, done: false, edit: false } };
    setTodos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = async (key) => {
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
  };

  const doneToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].done = true;
    setTodos(newToDos);
    await saveToDos(newToDos);
  };

  const editToDo = (key, text) => {
    const newToDos = { ...toDos };
    newToDos[key].edit = newToDos[key].edit ? false : true;
    setTodos(newToDos);
    setEditText(text);
  };

  const editTextToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].text = editText;
    newToDos[key].edit = false;
    setTodos(newToDos);
    await saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={travel} // 이벤트
        >
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.gray }}>Travel</Text>
        </TouchableOpacity>
      </View>

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
      <ScrollView>
        {toDos ? (
          Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              toDos[key].done === false ? (
                <View style={styles.toDo} key={key}>
                  {toDos[key].edit === false ? (
                    <Text style={styles.toDoText}>{toDos[key].text}</Text>
                  ) : (
                    <TextInput
                      returnKeyType="done"
                      style={styles.editInput}
                      value={editText}
                      onChangeText={(payload) => setEditText(payload)}
                      onSubmitEditing={() => editTextToDo(key)}
                    />
                  )}
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => editToDo(key, toDos[key].text)}>
                      <Entypo name="edit" size={24} color={theme.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginHorizontal: 20 }}
                      onPress={() => doneToDo(key)}
                    >
                      <Fontisto name="check" size={18} color={theme.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteToDo(key)}>
                      <Fontisto name="trash" size={18} color={theme.gray} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.toDo} key={key}>
                  <Text style={styles.toDoTextDone}>{toDos[key].text}</Text>
                  <TouchableOpacity onPress={() => deleteToDo(key)}>
                    <Fontisto name="trash" size={18} color={theme.gray} />
                  </TouchableOpacity>
                </View>
              )
            ) : null
          )
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toDoText: { color: "white", fontSize: 16, fontWeight: 500 },
  toDoTextDone: {
    color: "gray",
    textDecorationLine: "line-through",
    fontSize: 16,
    fontWeight: 500,
  },
  editInput: {
    backgroundColor: "white",
    width: 150,
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
