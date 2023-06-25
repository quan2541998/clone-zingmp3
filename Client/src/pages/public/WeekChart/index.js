import React from "react";
import { useParams } from "react-router-dom";
const WeekChart = () => {
  const { title, pid } = useParams();

  return <div>WeekChart</div>;
};

export default WeekChart;
