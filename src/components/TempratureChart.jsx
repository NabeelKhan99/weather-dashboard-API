import React, { useEffect, useRef } from 'react';
import { createTemperatureChart, updateTemperatureChart } from './charts/temperatureChart';

const TemperatureChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data.length) {
      createTemperatureChart(canvasRef.current, data);
    }
  }, [data]);

  useEffect(() => {
    if (canvasRef.current && data.length) {
      updateTemperatureChart(data);
    }
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default TemperatureChart;
