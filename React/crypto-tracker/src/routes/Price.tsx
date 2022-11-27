import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "./api";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
  padding: 25px;
  border-radius: 15px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: 5px;
  }
  &:last-child {
    font-size: 2rem;
  }
`;

const PriceView = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const PriceViewItem = styled.div<IValue>`
  background-color: rgba(0, 0, 0, 0.5);
  width: 200px;
  height: 100px;
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

interface PriceProps {
  ath_date?: string;
  ath_price?: number;
  percent_change_1h?: number;
  percent_change_6h?: number;
  percent_change_12h?: number;
  percent_change_24h?: number;
  percent_change_7d?: number;
  percent_change_30d?: number;
}

interface IValue {
  value?: number;
}

function Price({ ath_date, ath_price, percent_change_1h, percent_change_6h, percent_change_12h, percent_change_24h, percent_change_7d, percent_change_30d }: PriceProps) {
  return (
    <>
      <Overview>
        <OverviewItem>
          <span>${ath_date}</span>
          <span>최고가 달성</span>
        </OverviewItem>
        <OverviewItem>
          <span>${ath_price?.toFixed(3)}</span>
        </OverviewItem>
      </Overview>
      <PriceView>
        <PriceViewItem value={percent_change_1h}>
          <span>1시간 전보다</span>
          <span>{percent_change_1h?.toFixed(2)}%</span>
        </PriceViewItem>
        <PriceViewItem value={percent_change_6h}>
          <span>6시간 전보다</span>
          <span>{percent_change_6h?.toFixed(2)}%</span>
        </PriceViewItem>
        <PriceViewItem value={percent_change_12h}>
          <span>12시간 전보다</span>
          <span>{percent_change_12h?.toFixed(2)}%</span>
        </PriceViewItem>
        <PriceViewItem value={percent_change_24h}>
          <span>24시간 전보다</span>
          <span>{percent_change_24h?.toFixed(2)}%</span>
        </PriceViewItem>
        <PriceViewItem value={percent_change_7d}>
          <span>7일 전보다</span>
          <span>{percent_change_7d?.toFixed(2)}%</span>
        </PriceViewItem>
        <PriceViewItem value={percent_change_30d}>
          <span>30일 전보다</span>
          <span>{percent_change_30d?.toFixed(2)}%</span>
        </PriceViewItem>
      </PriceView>
    </>
  );
}
export default Price;
