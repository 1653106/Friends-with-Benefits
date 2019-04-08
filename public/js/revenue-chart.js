//revenue chart
var ctx = document.getElementById('revenue-chart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Revenue 2019',
            backgroundColor: 'rgba(255, 173, 88, 0.5)',
            borderColor: 'rgba(88, 201, 239, 0.5)',
            data: [0, 5, 20]
        }]
    },

    // Configuration options go here
    options: {}
});