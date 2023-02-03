import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter(); //router 객체 내부의 정보를 알 수 있다.
  return (
    <nav>
      <Link href="/" style={{ color: router.pathname === "/" ? "red" : "blue" }}>
        Home
      </Link>
      <Link href="/about" style={{ color: router.pathname === "/about" ? "red" : "blue" }}>
        About
      </Link>
    </nav>
  );
}
