$(document).ready(function() {
    var result;
    $('#btnSubmit').click(function(event) {
        if (document.getElementById("choosefile").files.length == 0) {
            document.getElementById('validate').innerHTML = `Choose file`;
            result = false;
        } else if (result == true) {
            document.getElementById('validate').style.color = "green";
            document.getElementById('validate').innerHTML = `Successfully Uploaded`;
            result = true;
        }
        return result;
    });

    $(":file").change(function() {
        result = true;
        for (var i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            var fileType = file["type"];
            var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if ($.inArray(fileType, validImageTypes) < 0) {
                document.getElementById('validate').style.color = "red";
                document.getElementById('validate').innerHTML = `Please choose image file`;
                result = false;
                break;
            }
        }
        return result;
    });
});