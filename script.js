var socket = io();
var m = 55;
var n = 55;
var side = 20;
weather = "autumn";
function setup() {
    frameRate(5);
    createCanvas(35 * side, 35 * side);
    background('#acacac');
}
function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(weather == "winter"){
                fill("white");
                }
                else if(weather == "summer"){
                    fill("Lime");
                }
                else if(weather == "autumn"){
                    fill("brown");
                }
                else if(weather == "spring"){
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
window.onload = function(){
document.getElementById("weather").innerHTML = weather;
var earthquakeelem = document.getElementById('Earthquake');
earthquakeelem.onclick = earthquakehandler;
}