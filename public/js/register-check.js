$('document').ready(function() {
    $('#register').submit(function() {
        if ($('#registerpassword').val() == $('#retype').val()) {
            $(this).attr('action', 'register');
            return true;
        } else {
            alert($('#registerpassword').val() + ', ' + $('#retype').val());
            return false;
        }
    })
});