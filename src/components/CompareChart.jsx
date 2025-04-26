import React, { useEffect, useRef } from 'react';
import { createCompareChart, updateCompareChart } from './charts/compareChart';

const CompareChart = ({ citiesData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && citiesData.length) {
      createCompareChart(canvasRef.current, citiesData);
    }
  }, [citiesData]);

  useEffect(() => {
    if (canvasRef.current && citiesData.length) {
      updateCompareChart(citiesData);
    }
  }, [citiesData]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CompareChart;
