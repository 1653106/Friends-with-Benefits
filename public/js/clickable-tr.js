$('document').ready(function() {
    $('.clickable-tr').click(function() {
        window.location.href = $(this).attr('data-href');
    });
});