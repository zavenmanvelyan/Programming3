var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});



weather = "autumn";
mulledGrasses = 0;
grassEaterEat = 0;
deadWolfes = 0;
numberOfBombs = 0;
superheroSave = 0;

function getMatrix(rows, columns) {
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

matrix = getMatrix(35, 35);

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

io.on('connection', function (socket) {
    socket.on('earthquake', function (param) {
        var randomplace_X = Math.floor(Math.random() * 35);
        var randomplace_Y = Math.floor(Math.random() * 35);
        var dir = [
            [randomplace_X - 2, randomplace_Y - 2],
            [randomplace_X + 2, randomplace_Y - 2],
            [randomplace_X - 1, randomplace_Y - 1],
            [randomplace_X + 1, randomplace_Y - 1],
            [randomplace_X, randomplace_Y],
            [randomplace_X - 1, randomplace_Y + 1],
            [randomplace_X + 1, randomplace_Y + 1],
            [randomplace_X - 2, randomplace_Y + 2],
            [randomplace_X + 2, randomplace_Y + 2],
        ]
        for (var edir in dir) {
            let earthq_X = dir[edir][0];
            let earthq_Y = dir[edir][1];
            if (earthq_X >= 0 && earthq_X < matrix[0].length && earthq_Y >= 0 && earthq_Y < matrix.length) {
                if (matrix[earthq_Y][earthq_X] == 1) {
                    for (var n in grassArr) {
                        if (grassArr[n].x == earthq_X && grassArr[n].y == earthq_Y) {
                            grassArr.splice(n, 1);
                            break;
                        }
                    }
                }
                else if (matrix[earthq_Y][earthq_X] == 2) {
                    for (var l in grassEaterArr) {
                        if (grassEaterArr[l].x == earthq_X && grassEaterArr[l].y == earthq_Y) {
                            grassEaterArr.splice(l, 1);
                            break;
                        }
                    }
                }
                else if (matrix[earthq_Y][earthq_X] == 3) {
                    for (var u in wolfArr) {
                        if (wolfArr[u].x == earthq_X && wolfArr[u].y == earthq_Y) {
                            wolfArr.splice(u, 1);
                            break;
                        }
                    }
                }
                else if (matrix[earthq_Y][earthq_X] == 4) {
                    for (var q in bomberArr) {
                        if (bomberArr[q].x == earthq_X && bomberArr[q].y == earthq_Y) {
                            bomberArr.splice(q, 1);
                            break;
                        }
                    }
                }
                else if (matrix[earthq_Y][earthq_X] == 5) {
                    for (var j in superheroArr) {
                        if (superheroArr[j].x == earthq_X && superheroArr[j].y == earthq_Y) {
                            superheroArr.splice(j, 1);
                            break;
                        }
                    }
                }
                matrix[earthq_Y][earthq_X] = 0;
            }
        }
        io.sockets.emit("matrix", matrix);
    })
})

var obj = {"info": []};

var count = 1;
function weatherChange(){
    count++;
    if(count == 5){
        count = 1;
    }
    else if(count == 1){
        weather = "summer";
    }
    else if(count == 2){
        weather = "winter";
    }
    else if(count == 3){
        weather = "spring";
    }
    else if(count == 4){
        weather = "autumn";
    }
    io.sockets.emit("weather",weather);
}
function main(){
    var file = "Statistics.json";
    obj.info.push({"nor_cnvac_grassner":mulledGrasses});
    obj.info.push({"grasseater_kerac_kerparneri_qanak":grassEaterEat});
    obj.info.push({"merac_wolfer":deadWolfes});
    obj.info.push({"bomber_qcac_bomberi_qanak":numberOfBombs});
    obj.info.push({"superhero_save_arac_kerparneri_qanak":superheroSave});
    fs.writeFileSync(file,JSON.stringify(obj,null,3));
}
server.listen(3000);


setInterval(weatherChange,3000);
setInterval(drawserver,3000);
setInterval(main,6000);
