$('document').ready(function() {
    $('#login').submit(function() {
        if ($('#username').val() == "admin" && $('#password').val() == "admin") {
            alert('welcome admin');
            $(this).attr('action', 'login-admin');
        } else {
            $(this).attr('action', 'login-user');
        }
        return true;
    })
});