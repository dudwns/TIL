import Button from "./Button"; //Button 컴포넌트 import
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Welcome back!</h1>
      <Button text={"Continue"}/>
    </div>
  );
}

export default App;
