$('document').ready(function() {
    $('#login').submit(function() {
        if ($('#username').val() == "admin" && $('#password').val() == "admin") {
            alert('welcome admin');
            $(this).attr('action', '/login-admin');
            return true;
        } else {
            $(this).attr('action', '/login');
            return true;
        }
    })
});