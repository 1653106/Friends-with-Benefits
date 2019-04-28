$('document').ready(function() {
    $('#changepassword').submit(function() {
        if ($('#newpassword').val() == $('#retypepassword').val() && $('#newpassword').val() != $('#oldpassword').val()) {
            $(this).attr('action', 'change-password');
            return true;
        } else if ($('#newpassword').val() == $('#oldpassword').val()) {
            alert('new password must be different from old password!');
            return false;
        } else if ($('#newpassword').val() != $('#retypepassword').val()) {
            alert('Retype password must match new password');
            return false;
        }
    })
});