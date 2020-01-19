class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
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

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        if (this.energy > 0) {
            this.getNewCoordinates();
            var grasses = random(this.chooseCell(1));
            if (grasses == undefined) {
                var newc = random(this.chooseCell(0));
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
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }

    }
    eat() {
        this.getNewCoordinates();
        var grass = random(this.chooseCell(1));
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
        if (this.energy <= 0) {
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
