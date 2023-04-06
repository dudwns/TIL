# Prisma

## Prisam란?

SQL 코드를 쓰지 않고, JS, TS코드를 작성해 데이터베이스를 수정할 수 있도록 연결해주는 서비스다.

기존의 SQL 코드보다, js코드가 훨씬 보기 편하고 단순하기 때문에 효율적인 데이터베이스 관리가 가능하다

## 기능

1. Node.js and Typescript ORM(Object Relational Mapping)
   => JS or TS 와 데이터베이스 사이에 다리를 놓아줌 (기본적으로 번역기의 역할을 한다고 생각하면 됨)

2. Prisma를 사용하기 위해서는 먼저 Prisma에게 DB가 어떻게 생겼는지, 데이터의 모양을 설명해줘야 함 => schema.prisma

3. Prisma가 이런 타입에 관한 정보를 알고 있으면 client를 생성해줄 수 있음. client를 이용하면 TS로 DB와 직접 상호작용 가능, 자동완성 제공.

4. Prisma Studio : Visual Database Browser, DB를 위한 관리자 패널같은 것.

## PlanetScale

MySQL과 호환되는 serverless 데이터베이스 플랫폼

serverless: 서버가 없다는게 아니라, 우리가 서버를 관리하고 유지보수 할 필요가 없다는 뜻

## vitess

PlanetScale은 Vitess를 사용한다.

Vitess는 MySQL을 스케일링하기 위한 데이터베이스 클러스터링 시스템

인터넷에서 가장 큰 사이트를 호스팅하는 강력한 오픈 소스 기술이다.

## Vitess를 사용하는 이유

1. 수평 스케일
2. 고가용성 (Vitess의 기본 복제본 구성은 예기치 않은 이벤트가 발생할 때 기본에서 복제본으로 원활한 장애 조치를 허용합니다.)
3. MySQL 호환
4. 쿠버네티스 네이티브
5. 구체화된 뷰
6. 온라인 스키마 마이그레이션

### 장점

CLI를 통해 쉽게 데이터베이스를 다룰 수 있음

마치 Git처럼 메인 데이터베이스 이외에 Branch 데이터베이스를 사용할 수도 있음

이후 Merge를 하면 자동으로 배포가 됨

## prisma를 이용해서 PlanetScale 사용하기

### Prisma 설치

```
npm i prisma -D
```

Prisma 시작 (prisma 폴더랑 .env 폴더가 생성됨)

```
npx prisma init
```

.env에서 데이터베이스의 URL을 사용할 DB의 URL로 변경

prisma/schema.prisma(데이터베이스에 대한 모든 정보를 담은 파일)로 가서 provider를 사용할 데이터베이스로 바꿈

```
DATABASE_URL="mysql://DB URL/DB명"
```

prisma/schema.prisma에 model을 만들어줌

```javascript
model User {
  id Int @id @default(autoincrement()) //ID 이 model의 ID로 사용하고(식별), 자동으로 증가(1, 2, 3, 4, 5...)
  phone Int? @unique // 전화번호, 중복x
  email String? @unique // 이메일, 중복x
  name String // 이름, required
  avatar String? // 프로필 이미지
  createAt DateTime @default(now()) //생성 날짜, 기본값은 생성 시점의 날짜
  updateAt DateTime @updatedAt // 유저가 업데이트 될 때마다 이 field가 변할 것이다.
}
```

### scoop 설치 (콘솔을 통해서 설치 및 업데이트를 쉽게 할 수 있는 프로그램)

powershell 관리자 권한 실행 후 아래 명령어 입력 (Window)

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
irm get.scoop.sh | iex
```

### planetscale 설치

powershell 일반모드로 실행 후 아래 명령어 입력
scoop bucket add pscale https://github.com/planetscale/scoop-bucket.git
scoop install pscale mysql

vs코드에 pscale 입력해보면 설치 확인 가능

## planetscale 사용

로그인

```
pscale auth login
```

region 확인

```
pscale region list
```

데이터베이스 생성

```
pscale database create DB명 --region ap-northeast (원하는 region)
```

데이터베이스 연결 (URL 생성됨)

```
pscale connect DB명
```

생성된 URL을 .env에 넣으면 된다.

Vitess는 foreign key constraint를 지원하지 않음 (일반적인 MySQL, PostgresQL은 지원함)
Scaling을 위해 데이터를 분산하기 때문, 따라서 이 작업은 Prisma에서 수행하는데 이것을 schema.prisma 파일에 명시해야 함

```javascript
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma" // foreign key constraint를 지원하는 작업을 prisma가 할 것으로 지정
}
```

변경된 작업을 DB에 push 하는 명령어

```
npx prisma db push
```

DB를 관리할 수 있는 툴을 제공

```
npx prisma studio
```

### 클라이언트 설치

```
npm install @prisma/client
```

src/libs/client 폴더 만들고 client.ts 파일 생성

```javascript
import { PrismaClient } from "@prisma/client";
export default new PrismaClient();
```

client를 사용하기 전에 npx prisma generate를 해줘야 됨 (client 생성 준비 과정)

```
npx prisma generate
```

src/pages/api 폴더 생성 (api 만드는 폴더)
client-test.tsx 파일 생성 후

```javascript
import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.user.create({
    data: {
      email: "hi",
      name: "hi",
    },
  });

  res.json({
    ok: true,
  });
}
```

이런 식으로 export default만 해주면 api가 호출됨
호출 URL은 /api/파일명, 위 경우에는 /api/client-test 경로로 api가 호출됨
