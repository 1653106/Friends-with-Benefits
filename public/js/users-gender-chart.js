//gender chart

//to date dp change event
$("#todate").on("change dp.change", function (e){
    if($("#fromdate").val()!="")
    {
        var fromdate = new Date($('#fromdate').val());
        var todate = new Date($('#todate').val());

        //find date array
        dateArray=getDates(fromdate,todate);

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
    if(dateArray.length==0)
            chart.destroy();
    }
})

//from date dp change event
$("#fromdate").on("change dp.change", function (e){
    if($("#todate").val()!="")
    {
        var fromdate = new Date($('#fromdate').val());
        var todate = new Date($('#todate').val());

        //find date array
        dateArray=getDates(fromdate,todate);
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
        if(dateArray.length==0)
            chart.destroy();
    }
})

//function find date array
function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('DD/MM/YYYY') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}