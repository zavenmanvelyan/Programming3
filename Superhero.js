var LivingCreature = require("./LivingCreature.js");

module.exports = class Superhero extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 14;
        this.multiply = 0;
        this.directions = [];
        this.changingframe = 0;
        this.savingframe = 0;
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
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
        if (this.energy > 0) {
            this.energy--;
            this.getNewCoordinates();
            var wolf = random(super.chooseCell(3));
            var bomber = random(super.chooseCell(4));
            if (wolf == undefined && bomber == undefined) {
                var newc = random(super.chooseCell(0));
                if (newc) {
                    matrix[newc[1]][newc[0]] = 5;
                    matrix[this.y][this.x] = 0;
                    this.y = newc[1];
                    this.x = newc[0];
                }
            }
            else {
                this.move;
            }
        }
    }


    mul() {
        this.getNewCoordinates();
        var newCell = random(super.chooseCell(0));
        if (this.energy >= 24 && newCell) {
            var newSuperhero = new Superhero(newCell[0], newCell[1], this.index);
            superheroArr.push(newSuperhero);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 14;
        }
    }


    eat() {
        this.getNewCoordinates();
        var wolf = random(super.chooseCell(3));
        var bomber = random(super.chooseCell(4));
        if (wolf) {
            this.energy += 3;
            matrix[wolf[1]][wolf[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.y = wolf[1];
            this.x = wolf[0];
            for (var g in wolfArr) {
                if (wolfArr[g].x == wolf[0] && wolfArr[g].y == wolf[1]) {
                    wolfArr.splice(g, 1);
                    break;
                }
            }
        }
        else if (bomber) {
            this.energy += 3;
            matrix[bomber[1]][bomber[0]] = 5;
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


    changingcharacter() {
        this.changingframe++;
        if (this.energy > 0 && this.changingframe >= 5) {
            this.changingframe = 0;
            let bombers = super.chooseCell(4);
            let wolfs = super.chooseCell(3);
            this.energy--;
            if (bombers) {
                for (var h in bombers) {
                    var bx = bombers[h][0];
                    var by = bombers[h][1];
                    for (var u in bomberArr) {
                        if (bx == bomberArr[u].x && by == bomberArr[u].y) {
                            var randchar = [1, 2];
                            matrix[by][bx] = random(randchar);
                            if (matrix[by][bx] == 1) {
                                var gras = new Grass(bx, by, 1);
                                grassArr.push(gras);
                            }
                            else if (matrix[by][bx] == 2) {
                                var graset = new GrassEater(bx, by, 2);
                                grassEaterArr.push(graset);
                            }
                            bomberArr.splice(u, 1);
                            break;
                        }
                    }
                }
            }
            if (wolfs) {
                for (var h in wolfs) {
                    var wx = wolfs[h][0];
                    var wy = wolfs[h][1];
                    for (var u in wolfArr) {
                        if (wx == wolfArr[u].x && wy == wolfArr[u].y) {
                            var randchar = [1, 2];
                            matrix[wy][wx] = random(randchar);
                            if (matrix[wy][wx] == 1) {
                                var gras = new Grass(wx, wy, 1);
                                grassArr.push(gras);
                            }
                            else if (matrix[wy][wx] == 2) {
                                var graset = new GrassEater(wx, wy, 2);
                                grassEaterArr.push(graset);
                            }
                            wolfArr.splice(u, 1);
                            break;
                        }
                    }
                }
            }
        }
    }


    savingcharacters() {
        this.savingframe++;
        if (this.energy > 0 && this.savingframe >= 3) {
            this.energy--;
            this.savingframe = 0;
            var grassetarr = grassEaterArr.slice(0);
            var grasseater = random(grassetarr);
            if (grasseater) {
                let enemiewolfs = grasseater.chooseCell(3);
                let enemiebombers = grasseater.chooseCell(4);
                var gretenemie = random(enemiewolfs.concat(enemiebombers));
            }
            if (grasseater && gretenemie) {
                var gx = grasseater.x;
                var gy = grasseater.y;
                var direct = [
                    [gx - 1, gy - 1],
                    [gx, gy - 1],
                    [gx + 1, gy - 1],
                    [gx - 1, gy],
                    [gx + 1, gy],
                    [gx - 1, gy + 1],
                    [gx, gy + 1],
                    [gx + 1, gy + 1]
                ];
                var emptyplace = false;
                for (var i in direct) {
                    var newx = direct[i][0];
                    var newy = direct[i][1];
                    if (newx >= 0 && newy >= 0 && newx < matrix[0].length && newy < matrix.length) {
                        if (matrix[newy][newx] == 0) {
                            matrix[newy][newx] = 5;
                            matrix[this.y][this.x] = 0;
                            this.y = newy;
                            this.x = newx;
                            emptyplace = true;
                            break;
                        }
                    }
                }
                if (emptyplace) {
                    for (var h in direct) {
                        if (direct[h][0] >= 0 && direct[h][0] < matrix[0].length && direct[h][1] >= 0 && direct[h][1] < matrix.length) {
                            var enx = direct[h][0];
                            var eny = direct[h][1];
                            if (matrix[eny][enx] == 3) {
                                for (var h in wolfArr) {
                                    if (wolfArr[h].x == enx && wolfArr[h].y == eny) {
                                        wolfArr.splice(h, 1);
                                        matrix[eny][enx] = 0;
                                        break;
                                    }
                                }
                            }
                            else if (matrix[eny][enx] == 4) {
                                for (var h in bomberArr) {
                                    if (bomberArr[h].x == enx && bomberArr[h].y == eny) {
                                        bomberArr.splice(h, 1);
                                        matrix[eny][enx] = 0;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    die() {
        if (this.energy <= 0) {
            for (var v in superheroArr) {
                if (this.x == superheroArr[v].x && this.y == superheroArr[v].y) {
                    matrix[this.y][this.x] = 0;
                    superheroArr.splice(v, 1);
                    break;
                }
            }
        }
    }
}
