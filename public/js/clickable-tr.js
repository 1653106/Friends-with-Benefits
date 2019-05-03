$('document').ready(() => {
    $('.clickable-tr').click(() => {
        var tmp = $(this).data('id');
        alert(tmp);
        window.location.href = 'transaction-detail';
    });
})