var socket = io();
var m = 55;
var n = 55;
var side = 12;

function setup() {
    frameRate(5);
    createCanvas(55 * side, 55 * side);
    background('#acacac');
}
function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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
