import Chart from 'chart.js/auto';

let tempChart;

export const createTemperatureChart = (ctx, data) => {
  if (tempChart) tempChart.destroy();

  tempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(day => day.date),
      datasets: [{
        label: 'Temperature (°C)',
        data: data.map(day => day.temp),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 800,
        easing: 'easeInOutQuad'
      },
      plugins: {
        legend: { display: true },
        tooltip: { mode: 'index', intersect: false }
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

export const updateTemperatureChart = (data) => {
  if (!tempChart) return;
  tempChart.data.labels = data.map(day => day.date);
  tempChart.data.datasets[0].data = data.map(day => day.temp);
  tempChart.update();
};
