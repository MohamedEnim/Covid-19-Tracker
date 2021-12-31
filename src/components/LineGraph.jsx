import React, { useState, useEffect } from "react";
import http from "./../http";
import numeral from "numeral";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { buildChartData, casesTypeColors } from "../utils";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        format: "mm/dd/yy",
        tooltipFormat: "ll",
      },
      scaleLabel: {
        display: true,
        labelString: "Date",
      },
    },

    y: {
      grid: {
        display: false,
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, values) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};

const LineGraph = ({ casesType, className }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getHistorical = async () => {
      const { data } = await http.get(
        "v3/covid-19/historical/all?lastdays=120"
      );

      setItems(buildChartData(data, casesType));
    };
    getHistorical();
  }, [casesType]);

  const data = {
    // labels,
    datasets: [
      {
        data: items,
        backgroundColor: casesTypeColors[casesType].hex,
        borderColor: casesTypeColors[casesType].hex,
        fill: true,
      },
    ],
  };

  return (
    <div className={className}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineGraph;
