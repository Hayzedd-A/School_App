$(document).ready(function () {
    // hide the elements in the classClass category by default
    $('#classClass option:not(.kindergaten), #departments, .subjectCombinationContainer').hide()
    // set the registration date to the current date
    let today = new Date()
    let date = {
        'mm': ('0' + (today.getMonth() + 1)).slice(-2),
        'dd': ('0' + today.getDate()).slice(-2),
        'yyyy': today.getFullYear()
    }
    $("#date").val(date.yyyy+'-'+date.mm+'-'+date.dd)

})

let error = $('.error')

// hide or show some class option depending on category selected
$('#classCategory').change(function () {
    let selected = $('#classCategory option:selected').attr('class').split(' ')[2]
    console.log(selected)
    $('.subjectCombinationContainer').show()
    let containerWidth = $('.subjectCombination > div').width() * -1 - 32
    let ones = true
    $('#classClass option').each(function () {
        if (!(selected == $(this).attr('class').split(' ')[1])) {
            $(this).hide()
        }
        else {
            $(this).show()
            if (ones) {
                $(this).prop('selected', true)
                ones = false
            }
        }
    })
    if (selected == 'senior') {
        $('#departments').show()
        $('.general input').prop('checked', true)
    }
    else {
        $('#departments').hide()
        $('.general input').prop('checked', false)
    }
    
    if (selected == 'kindergaten') {
        $('.subjectCombinationContainer').hide()
    }

    let left = 0
    $('.subjectCombination > div').each(function () {
        $('.subjectCombination').css('left', left * containerWidth)
        left += 1

        if ($(this).attr('class').split(' ')[0] == selected) {
            return false
        }
    })
})

// check checkboxes when department are selected
$('.department').click(function (e) {
    $('.departments input').prop('checked', false)
    $('.' + (e.currentTarget.attributes[3].nodeValue) + ' input').each(function () {
        $(this).prop('checked', true)
    })

})

// get the selected value in a radio input
function checkedRadio(radioClass, checked = "null") {
    // let checked = 'null'
    for (item of radioClass) {
        if (item.checked) {
            checked = item.value
        }
    }
    return checked
}

// get the selected value in a checkbox input
function checkedBoxes(selector) {
    let boxes = []
    for (box of selector) {
        if (box.checked) {
            boxes.push(box.value)
        }
    }
    return boxes
}


// convert camel case to sentence case
function toSentence(camelCase) {
    let sentenceCase = camelCase[0].toLocaleUpperCase()
    for (let i = 1; i < camelCase.length; i++) {
        if (camelCase[i] === camelCase[i].toLocaleUpperCase()) {
            sentenceCase += ' '
        }
        sentenceCase += camelCase[i]
    }
    return sentenceCase
}



$('input').click(function () {
    $('input').each(function () {
        if ($(this).val()) {
            $(this).css('borderColor', 'gray')
        }
    })
})

function isemail(string) {
    var emailreg = /^([a-zA-Z0-9_.+-]+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4}))?$/;
    return (emailreg.test(string))
}

$('#submit').click(function () {
    error.html('')
    error.hide()
    complete = true

    let elements = {
        'lastName':     $.trim($("#lastName").val()),
        'middleName':   $.trim($("#middleName").val()),
        'firstName':    $.trim($("#firstName").val()),
        'address':      $.trim($("#address").val()),
        'gender':       checkedRadio($(".gender"), null),
        'dateOfBirth':  $.trim($("#dateOfBirth").val()),
        'guardianName':   $.trim($("#guardianName").val()),
        'phoneNumber':  $.trim($("#phoneNumber").val()),
        'emailAddress': $.trim($("#emailAddress").val()),
        'guardianAddress':$.trim($("#guardianAddress").val()),
        'date':         $.trim($("#date").val()),
        'classCategory':$.trim($("#classCategory option:selected").val()),
        'classClass':   $.trim($("#classClass option:selected").val()),
        'department':   checkedRadio($(".department")),
        'subjects':     checkedBoxes($(".departments input")),
    }

    let errorText = 'Some input field are empty <br>'
    $.each(elements, function (name, element) {
        // console.log(`${name} => ${Boolean(element)}`)

        if (!element) {
            error.show()
            error.append(errorText)
            errorText = ''
            $('#' + name).css('borderColor', 'red')

            complete = false
        }
        else {
            $('#' + name).css('borderColor', 'gray')
        }

        if (name.includes('Name')) {
            var namereg = /^(([A-Za-z]+)\s?([A-Za-z]+)?)?$/
            if (!namereg.test(element)) {
                error.append(`${toSentence(name)} is not properly filled <br>`)
                console.log('error in name')
                error.show()
                complete = false
            }
        }
        if (name.includes('email')) {
            if (!isemail(element)) {
                error.append(`${toSentence(name)} is not properly filled <br>`)
                error.show()
                complete = false
            }
        }
    })
    
    console.log(elements)

    return complete
})