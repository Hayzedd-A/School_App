$( function() {
  $( ".accordion" ).accordion({
    "collapsible": true,
    "active": 'none',
    "heightStyle": 'content'
  });
  let dialogHeight = $('body').height() * 0.9
  $( ".mainResult" ).dialog({
    autoOpen: false,
    width: '70vw',
    height: dialogHeight
  });
});

let allElement = $('.detailsContainer span')

$('#edit').click(function() {
  allElement.each(function() {
    
    console.log($(this).text())
  })
})

$('.eachResult').click(function(id) {
  console.log(id.currentTarget.id)
  $('.mainResult').dialog('open')
})

$('tr').click(function() {
  // let locationString = $(this).attr('class')
  window.location.href = "../fullAttendance.html"
})
var options = {
  pdfOpenParams: {
  zoom: "Fit"
  }
}
PDFObject.embed("database.pdf", ".resultPDF", options);
