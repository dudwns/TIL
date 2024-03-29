import Seo from "components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    // router.push(`/movies/${id}`); // Link가 아닌 코드를 통해 유저를 navigating 하는 방법
    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     query: {
    //       title, // url에서 url로 정보를 넘겨줄 때
    //     },
    //   },
    //   `/movies/${id}`
    // ); // 클라이언트에게 보이는 url을 마스킹

    router.push(`/movies/${title}/${id}`); // 클라이언트에게 보이는 url을 마스킹
  };

  return (
    <div className="container">
      <Seo title="Home" />

      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link
              //   href={{
              //     pathname: `/movies/${movie.id}`,
              //     query: {
              //       title: movie.original_title, // url에서 url로 정보를 넘겨줄 때
              //     },
              //   }}
              //   as={`/movies/${movie.id}`}
              href={`/movies/${movie.original_title}/${movie.id}`}
            >
              {movie.original_title}
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  return {
    props: {
      results,
    }, // page의 props값으로 리턴
  };
} // server side에서만 실행되는 함수 (API를 다 불러온 후 클라이언트에게 화면을 보여줌, 그 전까지는 빈 화면)
// 그럼 언제 getServerSideProps를 사용해야 하는가?
// 반드시 데이터를 fetch해와야 하는 페이지를 pre-render해야 하는 경우에만 사용해야 한다.
// 데이터를 pre-render할 필요가 없다면 client side에서 데이터를 가져오는 것을 고려해야 한다.
// 반대로 페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 pre-render할 필요가 없는 경우 CSR을 고려해야 한다.
