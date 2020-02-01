var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
// Math.floor(Math.random()* chooseCell.length)
function getMatrix(rows,columns) {
    var matrix = [];
    for (let y = 0; y < rows; y++) {
        matrix[y] = [];
        for (let x = 0; x < columns; x++) {
            let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 5) {
                matrix[y][x] = 0;
            }
            if (a >= 5 && a < 45) {
                matrix[y][x] = 1;
            }
            else if (a >= 45 && a < 50) {
                matrix[y][x] = 2;
            }
            else if (a >= 50 && a < 73) {
                matrix[y][x] = 3;
            }
            else if (a >= 73 && a < 97) {
                matrix[y][x] = 4;
            }
            else if (a >= 97 && a < 100) {
                matrix[y][x] = 5;
            }
        }
    }
    return matrix;
}
grassArr = [];

grassEaterArr = [];

wolfArr = [];

bomberArr = [];

superheroArr = [];

var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var Wolf = require("./Wolf.js");
var Bomber = require("./Bomber.js");
var Superhero = require("./Superhero.js");

matrix = getMatrix(55,55);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var gret = new GrassEater(x, y, 2);
            grassEaterArr.push(gret);
        }
        else if (matrix[y][x] == 3) {
            var wf = new Wolf(x, y, 3);
            wolfArr.push(wf);
        }
        else if (matrix[y][x] == 4) {
            var bb = new Bomber(x, y, 4);
            bomberArr.push(bb);
        }
        else if (matrix[y][x] == 5) {
            var sh = new Superhero(x, y, 5);
            superheroArr.push(sh);
        }
    }
}
function drawserver(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var j in grassEaterArr) {
        grassEaterArr[j].mul();
        grassEaterArr[j].eat();
        grassEaterArr[j].die();
    }
    for (var w in wolfArr) {
        wolfArr[w].mul();
        wolfArr[w].eat();
        wolfArr[w].die();
    }
    for (var b in bomberArr) {
        bomberArr[b].mul();
        bomberArr[b].runfromenemie();
        bomberArr[b].bombing();
        bomberArr[b].eat();
        bomberArr[b].die();
    }
    for (var s in superheroArr) {
        superheroArr[s].changingcharacter();
        superheroArr[s].savingcharacters();
        superheroArr[s].mul();
        superheroArr[s].eat();
        superheroArr[s].die();
    }
    io.sockets.emit("matrix",matrix);
}
setInterval(drawserver,3000);
