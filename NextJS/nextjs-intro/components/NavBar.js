import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter(); //router 객체 내부의 정보를 알 수 있다.
  return (
    <>
      <nav>
        <Link href="/">
          <span className={router.pathname === "/" ? "active" : ""}>Home</span>
        </Link>
        <Link href="/about">
          <span className={router.pathname === "/about" ? "active" : ""}>About</span>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
          }
          .active {
            color: tomato;
          }
          span {
            background-color: white;
          }
        `}</style>
      </nav>
    </>
  );
}
