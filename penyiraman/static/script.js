document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById('humidityChart').getContext('2d');
    let humidityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Kelembaban (%)',
                data: [],
                borderColor: 'green',
                borderWidth: 2,
                fill: true,
                pointRadius: 4
            }]
        },
        options: {
            scales: {
                y: { min: 0, max: 100 }
            }
        }
    });

    function updateChart() {
        let now = new Date().toLocaleTimeString();
        let humidity = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
        humidityChart.data.labels.push(now);
        humidityChart.data.datasets[0].data.push(humidity);
        if (humidityChart.data.labels.length > 10) {
            humidityChart.data.labels.shift();
            humidityChart.data.datasets[0].data.shift();
        }
        humidityChart.update();
    }

    setInterval(updateChart, 3000);
});
