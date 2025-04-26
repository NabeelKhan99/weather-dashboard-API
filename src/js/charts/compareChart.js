import Chart from 'chart.js/auto';

let compareChart;

export const createCompareChart = (ctx, citiesData) => {
  if (compareChart) compareChart.destroy();

  const labels = citiesData[0]?.data.map(day => day.date);
  const datasets = citiesData.map((city, i) => ({
    label: city.name,
    data: city.data.map(day => day.temp),
    borderColor: ['#f87171', '#34d399', '#818cf8'][i % 3],
    fill: false,
    tension: 0.4
  }));

  compareChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutCubic'
      },
      plugins: {
        legend: { display: true },
        tooltip: { mode: 'nearest', intersect: false }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: { color: '#f1f5f9' }
        },
        x: {
          ticks: { color: '#f1f5f9' }
        }
      }
    }
  });
};

export const updateCompareChart = (citiesData) => {
  if (!compareChart) return;

  compareChart.data.labels = citiesData[0]?.data.map(day => day.date);
  compareChart.data.datasets = citiesData.map((city, i) => ({
    label: city.name,
    data: city.data.map(day => day.temp),
    borderColor: ['#f87171', '#34d399', '#818cf8'][i % 3],
    fill: false,
    tension: 0.4
  }));

  compareChart.update();
};
