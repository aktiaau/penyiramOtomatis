document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById('humidityChart').getContext('2d');

    let humidityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Sensor 1',
                    data: [],
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 4
                },
                {
                    label: 'Sensor 2',
                    data: [],
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 4
                },
                {
                    label: 'Sensor 3',
                    data: [],
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Matikan aspek rasio bawaan agar tinggi bisa disesuaikan
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Kelembaban (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Waktu'
                    }
                }
            }
        }
    });

    // Fungsi untuk memperbarui data setiap beberapa detik
    function updateChart() {
        let now = new Date().toLocaleTimeString();
        let humidity1 = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
        let humidity2 = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
        let humidity3 = Math.floor(Math.random() * (90 - 50 + 1)) + 50;

        humidityChart.data.labels.push(now);
        humidityChart.data.datasets[0].data.push(humidity1);
        humidityChart.data.datasets[1].data.push(humidity2);
        humidityChart.data.datasets[2].data.push(humidity3);

        if (humidityChart.data.labels.length > 10) {
            humidityChart.data.labels.shift();
            humidityChart.data.datasets.forEach(dataset => dataset.data.shift());
        }

        humidityChart.update();
    }

    setInterval(updateChart, 3000);
});

document.addEventListener("DOMContentLoaded", function() {
            const sensorSwitch = document.getElementById("sensorSwitch");

            sensorSwitch.addEventListener("change", function() {
                if (sensorSwitch.checked) {
                    sensorSwitch.style.backgroundColor = "white";
                    sensorSwitch.style.borderColor = "white";
                } else {
                    sensorSwitch.style.backgroundColor = "red";
                    sensorSwitch.style.borderColor = "red";
                }
            });
        });