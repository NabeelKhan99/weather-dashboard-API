import Chart from 'chart.js/auto';

let precipChart;

export const createPrecipitationChart = (ctx, data) => {
  if (precipChart) precipChart.destroy();

  precipChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(day => day.date),
      datasets: [{
        label: 'Precipitation (mm)',
        data: data.map(day => day.precip),
        backgroundColor: '#38bdf8'
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 800,
        easing: 'easeOutBounce'
      },
      plugins: {
        legend: { display: true },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#f1f5f9' }
        },
        x: {
          ticks: { color: '#f1f5f9' }
        }
      }
    }
  });
};

export const updatePrecipitationChart = (data) => {
  if (!precipChart) return;
  precipChart.data.labels = data.map(day => day.date);
  precipChart.data.datasets[0].data = data.map(day => day.precip);
  precipChart.update();
};
