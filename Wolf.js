class Wolf {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 16;
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
            var ft = random(this.chooseCell(2));
            var jh = random(this.chooseCell(4));
            if (ft == undefined && jh == undefined) {
                var newc = random(this.chooseCell(0));
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
        this.getNewCoordinates();
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 22 && newCell) {
            var newWolf = new Wolf(newCell[0], newCell[1], this.index);
            wolfArr.push(newWolf);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 16;
        }
    }
    eat() {
        this.getNewCoordinates();
        var newc = random(this.chooseCell(2));
        var newce = random(this.chooseCell(4));
        if (newc) {
            this.energy += 2;
            matrix[newc[1]][newc[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = newc[1];
            this.x = newc[0];
            for (var g in grassEaterArr) {
                if (grassEaterArr[g].x == newc[0] && grassEaterArr[g].y == newc[1]) {
                    grassEaterArr.splice(g, 1);
                    break;
                }
            }
        }
        else if (newce) {
            this.energy += 2;
            matrix[newce[1]][newce[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = newce[1];
            this.x = newce[0];
            for (var j in bomberArr) {
                if (bomberArr[j].x == newce[0] && bomberArr[j].y == newce[1]) {
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