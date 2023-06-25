import React, { memo, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import _ from "lodash";
import styles from "./ChartSection.module.scss";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import SongItem from "../SongItem";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = () => {
  const { chart, ranks } = useSelector((state) => state.home);
  const chartRef = useRef(null);

  const [data, setData] = useState(null);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const [bgToolTip, setBgToolTip] = useState("");

  const options = {
    responsive: true,
    pointRadius: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },

    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "#754d8e", drawTicks: false },
        border: { dash: [1, 7] },
        min: chart.minScore,
        max: chart.maxScore,
      },
      x: {
        ticks: { color: "white" },
        grid: { display: false },
      },
    },

    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        intersect: false,

        callbacks: {
          labelColor: function (tooltipItem) {
            setBgToolTip(tooltipItem?.dataset?.borderColor);
          },
        },

        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }

          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]?.map(
                (item) => item.counter
              ),
              endcodeId: Object.keys(chart?.items)[i],
            });
          }
          const valueWhenHoverChart = +tooltip.body[0]?.lines[0]?.replace(
            ",",
            ""
          );
          const result = counters.find((item) =>
            item.data.some((number) => number === valueWhenHoverChart)
          );
          setSelected(result.endcodeId);

          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times?.map((item) => {
      if (item.hour % 2 === 0) {
        return `${item.hour}:00`;
      } else {
        return "";
      }
    });

    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.map(
            (item) => item.counter
          ),

          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#2b9d8e" : "#e35050",
          tension: 0.2,
          borderWidth: 1,
          pointRadius: 1,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#2b9d8e" : "#e35050",
          pointHoverBorderColor: "white",
          pointHoverRadius: 6,
          pointHoverBorderWidth: 2,
        });
      }
    }

    setData({ labels, datasets });
  }, [chart]);

  const handleMouseOver = (index) => {
    setData((prevState) => {
      const newData = { ...prevState };

      newData.datasets[index].pointRadius = 6;
      newData.datasets[index].pointBorderColor = "white";
      newData.datasets[index].pointBackgroundColor =
        index === 0 ? "#4a90e2" : index === 1 ? "#2b9d8e" : "#e35050";
      return newData;
    });
  };

  const handleMouseOut = (index) => {
    setData((prevState) => {
      const newData = { ...prevState };
      newData.datasets[index].pointRadius = 1;
      newData.datasets[index].pointBorderColor = "transparent";
      newData.datasets[index].pointBackgroundColor = "transparent";
      return newData;
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.bgBlur}></div>
      <div className={styles.bgAlpha}></div>
      <div className={styles.header}>
        <h1>#zingchart</h1>
        <img src="" alt="" />
      </div>
      <div className={styles.columns}>
        <div className={styles.ranks}>
          {ranks?.slice(0, 3).map((item, index) => (
            <SongItem
              key={index}
              data={item}
              order={index + 1}
              percent={Math.floor((+item.score * 100) / chart?.totalScore)}
              handleMouseOver={() => {
                handleMouseOver(index);
              }}
              handleMouseOut={() => {
                handleMouseOut(index);
              }}
              className={"chartSong"}
            />
          ))}

          <button>Xem thêm</button>
        </div>
        <div className={styles.chart}>
          {data && (
            <Line
              key={JSON.stringify(data)}
              ref={chartRef}
              data={data}
              options={options}
            />
          )}
          <div
            className={styles.tooltip}
            style={{
              top: tooltipState.top,
              left: tooltipState.left,
              opacity: tooltipState.opacity,
              background: bgToolTip,
            }}
          >
            <SongItem
              data={ranks?.find((item) => item.encodeId === selected)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
