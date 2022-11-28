import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            //데이터
            series={[
              {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            //옵션
            options={{
              theme: {
                mode: "dark",
              },
              //차트 크기
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                //선
                curve: "smooth",
                width: 3,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={
              [
                {
                  data: data?.map((price) => {
                    return {
                      x: price.time_close,
                      y: [parseFloat(price.open).toFixed(1), parseFloat(price.high).toFixed(1), parseFloat(price.low).toFixed(1), parseFloat(price.close).toFixed(1)],
                    };
                  }),
                },
              ] as any
            }
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "candlestick",
                height: 350,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                categories: data?.map((price) => price.time_close),
                labels: {
                  style: {
                    colors: "#9c88ff",
                  },
                },
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#0f7cf0",
                    downward: "#e63a06",
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
export default Chart;
