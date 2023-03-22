import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter(); //router 객체 내부의 정보를 알 수 있다.
  return (
    <nav>
      <img src="/vercel.svg" />
      <div>
        <Link href="/" className={router.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link href="/about" className={router.pathname === "/about" ? "active" : ""}>
          About
        </Link>
      </div>
      <style jsx>{`
        //styled jsx : 스타일의 적용 범위를 오직 해당 컴포넌트 내부로 한정한다.

        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
