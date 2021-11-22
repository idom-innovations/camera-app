// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    frontWindow = document.querySelector("#front-window-button"),
    frontWindowRight = document.querySelector("#front-window-right-button"),
    frontBumper = document.querySelector("#front-bumper-button")    ;
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    alert("clicked");
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
frontWindow.onclick = function() {
    document.querySelector("#video_overlay_front_window").style.display = 'block';
    document.querySelector("#video_overlay_front_window_right").style.display = 'none';
    document.querySelector("#video_overlay_front_bumper").style.display = 'none';
};

frontWindowRight.onclick = function() {
    document.querySelector("#video_overlay_front_window_right").style.display = 'block';
    document.querySelector("#video_overlay_front_window").style.display = 'none';
    document.querySelector("#video_overlay_front_bumper").style.display = 'none';
};
frontBumper.onclick = function() {
    document.querySelector("#video_overlay_front_bumper").style.display = 'block';
    document.querySelector("#video_overlay_front_window").style.display = 'none';
    document.querySelector("#video_overlay_front_window_right").style.display = 'none';
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

