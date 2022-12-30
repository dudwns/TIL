import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import Root from "./Root";
import About from "./screens/About";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />, //충돌이 일어나도 나타남
      },
      {
        path: "about",
        element: <About />,
      },
    ],
    errorElement: <NotFound />, //아무 자식도 발견되지 않았을 때 나타나는 페이지
  },
]); //Router를 array 형식으로 표현할 수 있게 함

export default router;

//errorElement: 컴포넌트에서 발생하는 문제로부터 다른 컴포넌트들을 보호해줌 (없으면 아예 동작X)
