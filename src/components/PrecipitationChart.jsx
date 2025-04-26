import React, { useEffect, useRef } from 'react';
import { createPrecipitationChart, updatePrecipitationChart } from './charts/precipitationChart';

const PrecipitationChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data.length) {
      createPrecipitationChart(canvasRef.current, data);
    }
  }, [data]);

  useEffect(() => {
    if (canvasRef.current && data.length) {
      updatePrecipitationChart(data);
    }
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PrecipitationChart;
