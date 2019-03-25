//gender chart
var ctx = document.getElementById('gender-chart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Male', 'Female'],
        datasets: [{
            backgroundColor: [
                'rgba(255, 173, 88, 0.5)',
                'rgba(88, 201, 239, 0.5)'
            ],
            data: [60, 40]
        }]
    },

    // Configuration options go here
    options: {}
});