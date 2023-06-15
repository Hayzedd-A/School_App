$('#classLevel').change(function() {
    let classLevel = $('#classLevel option:selected').val();
    $('#classAssign option').each(function() {
        if ($(this).attr('class') !== classLevel) {
            $(this).hide()
        }
        else {
            $(this).show()
        }
    })
})