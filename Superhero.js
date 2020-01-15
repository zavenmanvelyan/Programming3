class Superhero {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 14;
        this.multiply = 0;
        this.index = index;
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
        if (this.energy > 0) {
            this.energy--;
            this.getNewCoordinates();
            var ft = random(this.chooseCell(3));
            var tf = random(this.chooseCell(4));
            if (ft == undefined && tf == undefined) {
                var newc = random(this.chooseCell(0));
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
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 24 && newCell) {
            var newSuperhero = new Superhero(newCell[0], newCell[1], this.index);
            superheroArr.push(newSuperhero);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 14;
        }
    }
    eat() {
        this.getNewCoordinates();
        var newc = random(this.chooseCell(3));
        var newce = random(this.chooseCell(4));
        if (newc) {
            this.energy += 3;
            matrix[newc[1]][newc[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.y = newc[1];
            this.x = newc[0];
            for (var g in wolfArr) {
                if (wolfArr[g].x == newc[0] && wolfArr[g].y == newc[1]) {
                    wolfArr.splice(g, 1);
                    break;
                }
            }
        }
        else if (newce) {
            this.energy += 3;
            matrix[newce[1]][newce[0]] = 5;
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

    changingcharacter() {
        this.changingframe++;
        if (this.energy > 0 && this.changingframe >= 5) {
            this.changingframe = 0;
            let bombers = this.chooseCell(4);
            let wolfs = this.chooseCell(3);
            this.energy--;
            if (bombers) {
                for (var h in bombers) {
                    var bx = bombers[h][0];
                    var by = bombers[h][1];
                    for (var u in bomberArr) {
                        if (bx == bomberArr[u].x && by == bomberArr[u].y) {
                            var f = [1, 2];
                            matrix[by][bx] = random(f);
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
                    var bx = wolfs[h][0];
                    var by = wolfs[h][1];
                    for (var u in wolfArr) {
                        if (bx == wolfArr[u].x && by == wolfArr[u].y) {
                            var f = [1, 2];
                            matrix[by][bx] = random(f);
                            if (matrix[by][bx] == 1) {
                                var gras = new Grass(bx, by, 1);
                                grassArr.push(gras);
                            }
                            else if (matrix[by][bx] == 2) {
                                var graset = new GrassEater(bx, by, 2);
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
                let a = grasseater.chooseCell(3);
                let b = grasseater.chooseCell(4);
                var gretenemie = random(a.concat(b));
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