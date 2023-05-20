# 협업할 때 사용하기 위해 정리한 글!

## Git-flow란?

Git Flow는 Git으로 형상관리를 할 때 브랜치를 효율적으로 관리하기 위해 사용하는 브랜치 관리 전략(Branch management strategy)이다.

개인 프로젝트에서는 상관없지만, 팀 규모가 늘어나고 협업 중 브랜치 충돌을 방지하기 위해 사용한다.

### 브랜치

Git-flow에는 5가지 종류의 브랜치가 존재한다.
항상 유지되는 메인 브랜치들(master, develop)과 일정 기간 동안만 유지되는 보조 브랜치들(feature, release, hotfix)이 있다.

- master: 언제나 실행 가능하고 제품으로 출시될 수 있는 브랜치
- develop: 다음 출시 버전을 개발하는 브랜치
- feature: 기능을 개발하는 브랜치
- release: 이번 출시 버전을 준비하는 브랜치
- hotfix: 출시 버전에서 발생한 버그를 수정하는 브랜치

### 개발 흐름

처음에는 master와 develop 브랜치가 존재한다. 물론 develop 브랜치는 master에서부터 시작된 브랜치이다.

develop 브랜치에서는 상시로 버그를 수정한 커밋들이 추가된다. 새로운 기능 추가 작업이 있는 경우 develop 브랜치에서 feature 브랜치를 생성한다. feature 브랜치는 언제나 develop 브랜치에서부터 시작하게 된다.

기능 추가 작업이 완료되었다면 feature 브랜치는 develop 브랜치로 merge 된다.

develop에 이번 버전에 포함되는 모든 기능이 merge 되었다면 QA를 하기 위해 develop 브랜치에서부터 release 브랜치를 생성한다. QA를 진행하면서 발생한 버그들은 release 브랜치에서 수정된다.

QA를 무사히 통과했다면 release 브랜치를 master와 develop 브랜치로 merge 한다.

마지막으로 출시된 master 브랜치에서 버전 태그를 추가합니다.

### Git-flow 시작하기

`git flow init`

위 명령어를 입력하면 master를 기반으로 develop 브랜치를 생성하고 이동한다.

#### 기능을 개발하려고 할 때는?

`git flow feature start login`
예를 들어서 로그인 기능을 구현하려고 할 때 위처럼 입력한다.

입력하면 develop을 기반으로 feature/login 브랜치를 생성하고 마찬가지로 이동한다.

feature에서 작업하고 add 하고 commit 후 push해서 develop에 풀 리퀴 요청을 보내면 된다.

만약 기능 구현이 완료되고 풀 리퀴 없이 바로 develop에 병합하고 feature/login 브랜치를 삭제하려면 `git flow feature finish login`을 입력하면 된다.

#### 필요한 기능들이 완료가 되고 출시를 하려고 할 때는?

`git flow release start 1.0`

develop을 기반으로 release/1.0이라는 브랜치가 생성되고 이동한다. (1.0은 출시할 버전)

release 브랜치를 따로 나누는 이유는 일상적인 작업들이 계속 들어오게 되면서 릴리즈가 지연될 수 있기 때문이다. 그래서 release를 위한 작업들은 release 브랜치에서 작업한다.

release에서 작업한 결과물들은 어차피 develop에서도 필요한 작업이기 때문에 develop에 지속적으로 병합해줘야 한다.

#### 출시 준비가 끝났다면?

`git flow release finish 1.0`

위 명령어를 입력하면 master와 병합할 커밋 메시지를 입력하라고 한다.

두 번째로 어떤 이름의 태그를 쓸 건지 묻는다. 위에서는 1.0이라고 입력한다.

세 번째로 develop과 병합할 커밋 메시지를 입력한다.

그럼 결과적으로 release 브랜치와 병합된 master 브랜치에 1.0이라는 태그가 붙게 되고,
동시에 release 브랜치는 develop 브랜치와 병합이 된다.

#### 긴급한 오류, 버그로 인해 긴급하게 버전을 출시해야 할 때는?

`git flow hotfix start login`

예를 들어서 로그인 기능에 대한 오류가 있을 때 위처럼 입력한다.

그럼 master 브랜치를 기반으로 한 hotfix/login 브랜치가 생성되고 이동한다.

develop에서 가져오게 되면 develop에서 진행되고 있는 일상적인 작업들로 인해서 긴급하게 출시하기 어려울 수 있다. 그래서 master를 기반으로 hotfix 브랜치를 따로 생성한다.

#### hotfix 작업이 완료되면?

`git flow hotfix finish login`

위 명령어를 입력하면 master와 병합할 커밋 메시지를 입력한다.

두 번째로 master에 작성할 태그를 입력한다. (login)

세 번째로 develop과 병합할 커밋 메시지를 입력한다.

결과적으로 hotfix 브랜치는 develop 브런치와 master 브랜치로 병합이 완료된다.
