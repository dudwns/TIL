const quotes = [
  {
    quote:
      "만약 누군가를 당신의 편으로 만들고 싶다면, 먼저 당신이 그의 진정한 친구임을 확신시켜라.",
    author: "에이브러햄 링컨",
  },
  {
    quote: "재능은 게임에서 이기게 한다. 그러나 팀워크는 우승을 가져온다.",
    author: "마이클 조던",
  },
  {
    quote: "실패가 나태함에 대한 유일한 징벌은 아니다. 다른 이들의 성공도 있지 않은가.",
    author: "쥘 르나르",
  },
  {
    quote: "오늘 누군가가 그늘에 앉아 쉴 수 있는 이유는 오래 전에 누군가가 나무를 심었기 때문이다.",
    author: "워런 버핏.",
  },
  {
    quote: "지금 적극적으로 실행되는 괜찮은 계획이 다음 주의 완벽한 계획보다 낫다.",
    author: "조지 S. 패튼",
  },
  {
    quote: "수정을 용납하지 않는 계획은 나쁜 계획이다.",
    author: "퍼블릴리어스 사이러스",
  },
  {
    quote: "희망차게 여행하는 것이 목적지에 도착하는 것보다 좋다.",
    author: "로버트 루이스 스티븐슨",
  },
  {
    quote: "당신이 젊은 시절 꿈꾸었던 것에 충실하라.",
    author: "프리드리히 실러",
  },
  {
    quote: "웃음 없는 하루는 낭비한 하루다.",
    author: "찰리 채플린",
  },
  {
    quote: "우리가 무슨 생각을 하느냐가 우리가 어떤 사람이 되는지를 결정한다.",
    author: "오프라 윈프리",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = `- ${todaysQuote.author} -`;
