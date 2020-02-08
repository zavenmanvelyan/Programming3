var socket = io();
var m = 55;
var n = 55;
var side = 20;
function setup() {
    frameRate(5);
    createCanvas(35 * side, 35 * side);
    background('#acacac');
}
weather1 = "summer";
socket.on("weather",function(weather){
    document.getElementById("weather").innerHTML = weather;
    weather1 = weather;
});
function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(weather1 == "winter"){
                fill("white");
                }
                else if(weather1 == "summer"){
                    fill("Lime");
                }
                else if(weather1 == "autumn"){
                    fill("brown");
                }
                else if(weather1 == "spring"){
                    fill("LimeGreen");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
            }
            rect(x * side, y * side, side, side);
        }
    }

}
socket.on("matrix",drawMatrix);
function earthquakehandler(evt){
    var param = 0;
    socket.emit('earthquake',param);
}
window.onload = function (){
    var earthquakeelem = document.getElementById('Earthquake');
    earthquakeelem.onclick = earthquakehandler;
}