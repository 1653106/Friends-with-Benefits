$('document').ready(function() {
    $('#changepassword').submit(function() {
        if ($('#newpassword').val() == $('#retypepassword').val() && $('#newpassword').val() != $('#oldpassword').val()) {
            $(this).attr('action', 'change-password');
            return true;
        } else {
            alert($('#newpassword').val() + ', ' + $('#retypepassword').val() + ", " + $('#oldpassword').val());
            return false;
        }
    })
});