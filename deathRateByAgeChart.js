const getCovidData = async () => {
    try {
        const { labels, data } = await fetch('/.netlify/functions/getCovidData')
            .then(res => res.json());

        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Covid-19 Death Rate by Age',
                    data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } catch (e) {

    }
}

getCovidData();
