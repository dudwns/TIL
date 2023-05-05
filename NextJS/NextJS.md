# NextJS

## NextJS란?

Next.js는 React.js를 바탕으로 만들어진 웹 프레임워크이다.

프레임워크이다보니, React.js에 비해 자유도는 낮지만, 그만큼 정형화/규격화 되어 있어서 협업이 편하고 생산성이 높다.
<br>

## 라이브러리와 프레임워크의 차이점

라이브러리와 프레임워크의 주요 차이점은 "Inversion of Control"(통제의 역전)이다.

라이브러리에서 메서드를 호출하면 사용자가 제어할 수 있다.
그러나 프레임워크에서는 제어가 역전되어 프레임워크가 사용자를 호출한다.

ex)

라이브러리: 사용자가 파일 이름이나 구조 등을 정하고, 모든 결정을 내림
프레임워크: 파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따름
<br>

## CSR과 SSR

### CSR(Client Side Rendering)

렌더링이 클라이언트 쪽에서 일어난다.<br>
즉, 서버는 요청을 받으면 클라이언트에 HTML과 JS를 보내준다.<br>
클라이언트는 그것을 받아 렌더링을 시작한다.

### SSR(Server Side Rendering)

서버쪽에서 렌더링 준비를 끝마친 상태로 클라이언트에 전달하는 방식이다.
즉, 서버에서 이미 "렌더 가능한 상태"로 클라이언트에 전달되기 때문에, JS가 다운로드 되는동안 사용자는 무언가를 보고 있을 수 있다.
<br>

## Next.js는 React.js의 SEO(검색 엔진 최적화)문제를 해결하고자 등장하였다.

대표적인 CSR 라이브러리인 React.js는 Request에 대해 Javascript 코드만을 Response하는데, 이 JS 코드가 최종적인 HTML을 만드는 구조라, JS를 돌릴 줄 모르는 검색엔진이 사이트를 크롤링하면 텅 빈 HTML만 인식하게 되어 검색친화적이지 못하다.

반면, Next.js는 Request가 오면, 서버측에서 먼저 Rendering을 거친 후 HTML과 JS를 따로 Response한다. 따라서, 사용자는 HTML코드를 먼저 받아보게 되고, 그 이후 상호작용에 필요한 JS코드를 받아오기 때문에 사용자 측에서 느린 네트워크 혹은 네트워크 끊김, 모종의 이유로 인한 JS의 미실행 등의 환경에서도 대략적인 페이지의 내용을 마주할 수 있다. 이는 사용자 경험에서 큰 차이다. 또한, HTML 코드를 검색엔진이 바로 받아볼 수 있기에 관련 키워드 검색시 사이트가 검색결과에 노출될 가능성이 커진다.
<br>

## Next.js 기초 지식

시작하기

```
npx create-next-app --typescript
```

### pages 폴더

pages에 들어있는 파일명으로 라우터가 생성된다. 다시 말해, pages 폴더 안에 hello라는 이름의 파일이 존재한다면, 해당 웹앱은 "/hello" 라우터를 갖게 된다. 또한 Next.js는 그 파일 안에 들어있는 컴포넌트를 작동시킨다.

다만 예외사항으로는 index.js의 경우 앱이 시작하는 파일이라고 보면 된다. 즉 localhost:3000/ 그 자체이고, 뒤에 /index를 붙이면 안된다.

### 라우팅 방법

/movies 페이지를 만드려면 pages폴더 안에 movies.js를 생성하면 된다.<br>
/movies/all 페이지를 만드려면 pages 폴더 안에 movies라는 폴더를 생성 후 all.js를 생성하면 된다.

### /movies 페이지와 /movies/all 페이지를 같이 사용하려면?

pages폴더 안에 movies폴더를 생성 후, index.js와 all.js를 생성하면 된다.

### URL에 변수를 넣는 방법

React.js 에서는 :id 라고 알려줬지만 next.js는 라우터를 사용하지 않는다.
/movies/:id 로 라우팅 하고 싶으면 pages폴더 안에 movies폴더를 생성 후, [id].js를 생성하면 된다.

### Catch All Routes

movies폴더 안에 [...params].js 라고 생성하면 /movies 이후에 몇 개의 path가 붙어도 [...params].js 파일로 연결된다. 또한 /movies 이후에 오는 path들은 모두 파라미터화 되어 useRouter의 query 객체 안에 params 배열에서 확인이 가능하다.

만약 /movies/Spider-Man/39723 이라면, useRouter의 query에는 ["Spider-Man", "39723"]가 존재하게 된다. 이를 활용하려면

```javascript
export default function MovieDetail() {
  const router = useRouter();
  const [title, id] = router.query.params || [];
  return (
    <div>
      <h4>ID: {id}</h4>
      <h4>Movie Name:{title}</h4>
    </div>
  );
}
```

처럼 코드를 작성하여 화면에 출력할 수 있다.

### redirect

```javascript
const router = useRouter();
router.push("URL"); // 해당 페이지로 이동, 뒤로가기 히스토리에 기록이 남음
router.replace("URL"); // push와 다른 점은 뒤로가기 히스토리에 기록이 남지 않음
```

### 404 페이지 커스텀 방법

pages폴더 안에 404.js를 생성하면 된다.

### SWR (Stale While Revalidate)

SWR은 먼저 캐시로부터 데이터를 반환한 후, fetch 요청(재검증)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략입니다.

SWR을 사용하면 컴포넌트는 지속적이며 자동으로 데이터 업데이트 스트림을 받게 됩니다. 그리고 UI는 항상 빠르고 반응적입니다.

SWR은 React 프레임워크인 Next.js를 만든 동일한 팀이 만들었습니다.

설치

```
npm i swr
```

사용하기

```javascript
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);
  return data;
}
```

2개의 인자가 필요, 첫 번째는 요청을 보낼 URL(캐시를 저장할 때 사용할 Key이기도 함), 두 번째는 fetcher 함수

#### Global Configuration

컨텍스트 SWRConfig는 모든 SWR 훅에 대한 Global Configuration(옵션)을 제공할 수 있습니다.

```javascript
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr"; //모든 SWR 훅에 대한 global 옵션을 제공

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((response) => response.json()) }}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
```

### 미들웨어

미들웨어(middleware)란, 처음 유저가 보낸 요청과 종착지 사이에 있는 소프트웨어이다.<br>
유저의 정보를 DB에 보낼 때 중간에서 검증 함수를 거친다면, 그 함수가 미들웨어이다.

Next.js는 간편한 미들웨어 구현을 제공한다. src 폴더 내부에 middleware 이름을 가진 파일을 생성하면 된다.

미들웨어 예제

```javascript
import { NextRequest, NextFetchEvent, userAgent } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //   console.log("it works! global middleware"); // global 적용

  if (req.nextUrl.pathname.startsWith("/")) {
    const ua = userAgent(req);
    if (ua.isBot) {
      // Bot일 때 접근 제한 (전역 미들웨어)
      return new Response("봇은 이용할 수 없어요!", { status: 403 });
    }
  }
  if (req.nextUrl.pathname.startsWith("/chats")) {
    // chats 하위 폴더에서만 미들웨어 적용 (부분 미들웨어)
    console.log("chats ONLY middleware");
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.get("carrotsession")) {
      NextResponse.redirect(`${req.nextUrl.origin}/enter`); // cookie를 가지고 있지 않았을 때 페이지를 redirect 시킴
    }
  }

  return NextResponse.next();
}
```

### Dynamic Import

모듈을 동적으로 import 하여 첫 렌더링의 성능을 개선할 수 있다.

사용은 기존 컴포넌트와 똑같이 사용하면 된다. `<Bs/>`

```javascript
import dynamic from "next/dynamic";

const Bs = dynamic(() => import("@/Components/bs"), {
  ssr: false, // SSR 여부
  suspense: true, // Suspense 여부
  loading: () => <span>Loading...</span>, // Loading중일 때 화면 표시
}); // Dynamic Imports: 유저가 컴포넌트를 보고 있을 때만 import 할 수 있음
```

### Custom App

Next.js는 App 컴포넌트를 사용하여 page를 초기화한다. 이를 재정의하고 페이지 초기화를 제어할 수 있다. 이를 통해 다음과 같은 놀라운 일을 할 수 있다.

1. 페이지 변경 간에 레이아웃 유지
2. 페이지 탐색 시 state 유지
3. componentDidCatch를 사용한 Custom 에러 처리
4. 페이지에 추가 데이터 삽입
5. Global CSS 추가

기본 App을 재정의하려면 아래와 같이 ./pages/\_app.tsx 파일을 만든다.

```javascript
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Custom Document

Custom Document는 페이지가 서버 렌더링 될 때 사용되는 HTML 문서의 뼈대를 정의하는데 사용된다.

이 파일은 서버에서만 랜더링되므로 onClick과 같은 이벤트 핸들러는 \_document에서 사용할 수 없다.

Html, Head, Main 및 NextScript는 페이지가 제대로 랜더링되는 데 필요하다.

Custom Document를 활용한 폰트 최적화 예제

```javascript
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Script 컴포넌트

Script 컴포넌트를 사용하여 페이지 로드 시에 필요하지 않은 스크립트를 불러오지 않도록 할 수 있다.

개발자 시간을 절약하면서 로드하는 성능을 향상시킬 수 있다.

beforeInteractive: 페이지가 interactive 되기 전에 로드<br>
afterInteractive: 페이지가 interactive 된 후에 로드 (기본값)<br>
lazyOnload: 다른 모든 데이터나 소스를 불러온 후에 로드<br>

```javascript
// _app.tsx

import Script from 'next/script'

<Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
<Script
  src="https://connect.facebook.net/en_US/sdk.js"
  onLoad={() => { // 앞에 스크립트를 다 불러오고 난 후에  함수를 실행
    window.fbAsyncInit = function () {
      FB.init({
        appId: "your-app-id",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v16.0",
      });
    };
  }}
  strategy="lazyOnload"
/>
```
