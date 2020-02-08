var LivingCreature = require("./LivingCreature.js");

module.exports = class Wolf extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 16;
        this.directions = [];
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    
    move() {
        this.energy--;
        if (this.energy > 0) {
            var grasseaters = super.chooseCell(2)
            var grasseater = grasseaters[Math.floor(Math.random()* grasseaters.length)];
            var bombers = super.chooseCell(4);
            var bomber = bombers[Math.floor(Math.random()* bombers.length)];
            if (grasseater == undefined && bomber == undefined) {
                var newcells = super.chooseCell(0)
                var newc = newcells[Math.floor(Math.random()* newcells.length)];
                if (newc) {
                    matrix[newc[1]][newc[0]] = 3;
                    matrix[this.y][this.x] = 0;
                    this.y = newc[1];
                    this.x = newc[0];
                }
            }
        }
    }


    mul() {
        var energymul = 22;
        if(weather == "summer"){
            energymul = 20;
        }
        else if(weather == "spring"){
            energymul = 18;
        }
        this.getNewCoordinates();
        var choosecells = super.chooseCell(0);
        var newCell = choosecells[Math.floor(Math.random()* choosecells.length)];
        if (this.energy >= energymul && newCell) {
            var newWolf = new Wolf(newCell[0], newCell[1], this.index);
            wolfArr.push(newWolf);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 16;
        }
    }


    eat() {
        this.getNewCoordinates();
        if(weather == "winter"){
        var grasseaters = super.chooseCell(2)
        var grasseater = grasseaters[Math.floor(Math.random()* grasseaters.length)];
        }
        else if(weather == "autumn"){
        var bombers = super.chooseCell(4)
        var bomber = bombers[Math.floor(Math.random()* bombers.length)];
        }
        else{
            var grasseaters = super.chooseCell(2)
            var grasseater = grasseaters[Math.floor(Math.random()* grasseaters.length)];
            var bombers = super.chooseCell(4)
            var bomber = bombers[Math.floor(Math.random()* bombers.length)];
        }
        if (grasseater) {
            this.energy += 2;
            matrix[grasseater[1]][grasseater[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = grasseater[1];
            this.x = grasseater[0];
            for (var g in grassEaterArr) {
                if (grassEaterArr[g].x == grasseater[0] && grassEaterArr[g].y == grasseater[1]) {
                    grassEaterArr.splice(g, 1);
                    break;
                }
            }
        }
        if (bomber) {
            this.energy += 2;
            matrix[bomber[1]][bomber[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = bomber[1];
            this.x = bomber[0];
            for (var j in bomberArr) {
                if (bomberArr[j].x == bomber[0] && bomberArr[j].y == bomber[1]) {
                    bomberArr.splice(j, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }


    die() {
        if (this.energy <= 0) {
            deadWolfes++;
            for (var y in wolfArr) {
                if (this.x == wolfArr[y].x && this.y == wolfArr[y].y) {
                    matrix[this.y][this.x] = 0;
                    wolfArr.splice(y, 1);
                    break;
                }
            }
        }
    }
}