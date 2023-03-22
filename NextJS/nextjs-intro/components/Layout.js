import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}

// Layouts: 공통으로 사용되는 UI 컴포넌트를 layout 파일안에 위치시키면 불필요한 리렌더링을 방지를 하고 컴포넌트간의 상호 작용을 쉽게 구현할 수 있다.
