var LivingCreature = require("./LivingCreature.js");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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
            this.getNewCoordinates();
            var grasses = super.chooseCell(1)
            var grass = grasses[Math.floor(Math.random()* grasses.length)];
            if (grass == undefined) {
                var choosecells = super.chooseCell(0);
                var newc = choosecells[Math.floor(Math.random()* choosecells.length)];
                if (newc) {
                    matrix[newc[1]][newc[0]] = 2;
                    matrix[this.y][this.x] = 0;
                    this.y = newc[1];
                    this.x = newc[0];
                }
            }
        }
    }


    mul() {
        this.getNewCoordinates();
        var choosecells = super.chooseCell(0)
        var newCell = choosecells[Math.floor(Math.random()* choosecells.length)];
        var mulenergy = 13;
        if(weather == "summer"){
            mulenergy = 12;
        }
        else if(weather == "spring"){
            mulenergy = 10;
        }
        if (this.energy >= mulenergy && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }

    }


    eat() {
        this.getNewCoordinates();
        var grasses = super.chooseCell(1)
        var grass = grasses[Math.floor(Math.random()* grasses.length)];
        if (grass) {
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            matrix[grass[1]][grass[0]] = 2;
            this.y = grass[1];
            this.x = grass[0];
            let newX = grass[0];
            let newY = grass[1];
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }


    die() {
        var dieenergy = 0;
        if(weather == "winter"){
            dieenergy = 2;
        }
        else if(weather == "autumn"){
            dieenergy = 1;
        }
        if (this.energy <= dieenergy) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    matrix[this.y][this.x] = 0;
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}