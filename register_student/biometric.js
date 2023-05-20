
// Get the video and canvas elements
var canvas = document.getElementById('canvas');
var photo = document.getElementById('photo');
var captureButton = document.getElementById('captureBtn');

let capturable = false

// Capture the image when the user clicks the capture button
captureButton.addEventListener('click', function() {
    
    // Get the user's camera
    if (!capturable) {
        let $videoEl = $('<video>', {
            id: 'video',
            width: '760',
            height: '580',
            autoplay: true
        })
        $('.video').html($videoEl)
        video = document.getElementById('video');
        captureButton.innerText = 'Capture'
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Display the camera stream in the video element
            video.srcObject = stream;
        })
        .catch(function(err) {
            $('.result').show().append('An error occurred: ' + err)
        });
    }

    if (capturable) {
        // Draw the current video frame to the canvas
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        $('.video').html(canvas)
        captureButton.innerText = 'Start Capturing'

        // Convert the canvas to a data URL and set it as the source of the photo element
        let imageFile = canvas.toDataURL('image/png');
        console.log(imageFile)
    }
    capturable = !capturable
});

$('button').click(function() {
    return false
})

// creating new element and then appended to the end of the upload 
$('#addFile').click(function() {
    let uploadEl = $('.elementContainer:first-of-type').clone()
    $('.uploadContainer').append(uploadEl)

})


