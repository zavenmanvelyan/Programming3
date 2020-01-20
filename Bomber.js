class Bomber extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
        this.directions = [];
        this.bombframe = 0;
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
        if (this.energy > 0) {
            this.energy--;
            this.getNewCoordinates();
            var grasseater = random(super.chooseCell(2));
            if (grasseater == undefined) {
                var newc = random(super.chooseCell(0));
                if (newc) {
                    matrix[newc[1]][newc[0]] = 4;
                    matrix[this.y][this.x] = 0;
                    this.y = newc[1];
                    this.x = newc[0];
                }
            }
        }
    }


    mul() {
        this.getNewCoordinates();
        var newCell = random(super.chooseCell(0));
        if (this.energy >= 26 && newCell) {
            var newBomber = new Bomber(newCell[0], newCell[1], this.index);
            bomberArr.push(newBomber);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 20;
        }
    }


    eat() {
        this.getNewCoordinates();
        var grasseater = random(super.chooseCell(2));
        var grass = random(super.chooseCell(1));
        if (grasseater) {
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            matrix[grasseater[1]][grasseater[0]] = 4;
            this.y = grasseater[1];
            this.x = grasseater[0];
            let newX = grasseater[0];
            let newY = grasseater[1];
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (grass) {
            this.energy += 2
            matrix[this.y][this.x] = 0;
            matrix[grass[1]][grass[0]] = 4;
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
        }
        else {
            this.move();
        }
    }


    bombing() {
        this.bombframe++;
        if (this.energy > 0 && this.bombframe >= 3) {
            this.getNewCoordinates();
            this.bombingframe = 0;
            this.energy--;
            var bombdirect;
            var wfrr = wolfArr.slice(0);
            var fwolfes = this.chooseCell(3);

            if (fwolfes) {
                for (var g in fwolfes) {
                    var wx = fwolfes[g][0];
                    var wy = fwolfes[g][1];
                    for (var h in wfrr) {
                        if (wfrr[h].x == wx && wfrr[h].y == wy) {
                            wfrr.splice(h, 1);
                            break;
                        }
                    }
                }
            }

            var wolf = random(wfrr);

            if (wolf) {
                var wfx = wolf.x;
                var wfy = wolf.y;
                for (var q in wolfArr) {
                    if (wolfArr[q].x == wfx && wolfArr[q].y == wfy) {
                        wolfArr.splice(q, 1);
                    }
                }
                matrix[wfy][wfx] = 0;
                bombdirect = [
                    [wfx - 1, wfy - 1],
                    [wfx, wfy - 1],
                    [wfx + 1, wfy - 1],
                    [wfx - 1, wfy],
                    [wfx + 1, wfy],
                    [wfx - 1, wfy + 1],
                    [wfx, wfy + 1],
                    [wfx + 1, wfy + 1]
                ];
            }


            if (bombdirect) {
                for (var k in bombdirect) {
                    var nbx = bombdirect[k][0];
                    var nby = bombdirect[k][1];
                    if (nbx >= 0 && nbx < matrix[0].length && nby >= 0 && nby < matrix.length) {
                        if (matrix[nby][nbx] == 1) {
                            matrix[nby][nbx] = 0;
                            for (var h in grassArr) {
                                if (grassArr[h].x == nbx && grassArr[h].y == nby) {
                                    grassArr.splice(h, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[nby][nbx] == 2) {
                            matrix[nby][nbx] = 0;
                            for (var u in grassEaterArr) {
                                if (grassEaterArr[u].x == nbx && grassEaterArr[u].y == nby) {
                                    grassEaterArr.splice(u, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[nby][nbx] == 3) {
                            matrix[nby][nbx] = 0;
                            for (var n in wolfArr) {
                                if (wolfArr[n].x == nbx && wolfArr[n].y == nby) {
                                    wolfArr.splice(n, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[nby][nbx] == 5) {
                            matrix[nby][nbx] = 0;
                            for (var l in superheroArr) {
                                if (superheroArr[l].x == nbx && superheroArr[l].y == nby) {
                                    superheroArr.splice(l, 1);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    runfromenemie() {
        if (this.energy > 0) {
            this.energy--;
            var enemie = random(super.chooseCell(3));
            var runplace = super.chooseCell(0);
            var enemiedirect = [];
            if (enemie && runplace) {
                for (var h in wolfArr) {
                    if (wolfArr[h].x == enemie[0] && wolfArr[h].y == enemie[1]) {
                        let ex = enemie[0];
                        let ey = enemie[1];
                        enemiedirect = [
                            [ex - 1, ey - 1],
                            [ex, ey - 1],
                            [ex + 1, ey - 1],
                            [ex - 1, ey],
                            [ex + 1, ey],
                            [ex - 1, ey + 1],
                            [ex, ey + 1],
                            [ex + 1, ey + 1],
                        ];
                        break;
                    }
                }

                for (var r in runplace) {
                    var run_place_trfa = true;
                    for (var j in enemiedirect) {
                        if (enemiedirect[j][0] >= 0 && enemiedirect[j][0] < matrix[0].length && enemiedirect[j][1] >= 0 && enemiedirect[j][1] < matrix.length) {
                            if (runplace[r][0] == enemiedirect[j][0] && runplace[r][1] == enemiedirect[j][1]) {
                                run_place_trfa = false;
                                break;
                            }
                        }
                    }
                    if (run_place_trfa) {
                        matrix[this.y][this.x] = 0;
                        matrix[runplace[r][1]][runplace[r][0]] = 4;
                        this.y = runplace[r][1];
                        this.x = runplace[r][0];
                        break;
                    }
                }
            }
        }
    }


    die() {
        if (this.energy <= 0) {
            for (var v in bomberArr) {
                if (this.x == bomberArr[v].x && this.y == bomberArr[v].y) {
                    matrix[this.y][this.x] = 0;
                    bomberArr.splice(v, 1);
                    break;
                }
            }
        }
    }
}