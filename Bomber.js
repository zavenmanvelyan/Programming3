class Bomber {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.index = index;
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
            var ft = random(this.chooseCell(2));
            if (ft == undefined) {
                var newc = random(this.chooseCell(0));
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
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 26 && newCell) {
            var newBomber = new Bomber(newCell[0], newCell[1], this.index);
            bomberArr.push(newBomber);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 20;
        }
    }




    eat() {
        this.getNewCoordinates();
        var newcg = random(this.chooseCell(2));
        var newc = random(this.chooseCell(1));
        if (newcg) {
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            matrix[newcg[1]][newcg[0]] = 4;
            this.y = newcg[1];
            this.x = newcg[0];
            let newX = newcg[0];
            let newY = newcg[1];
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (newc) {
            this.energy += 2
            matrix[this.y][this.x] = 0;
            matrix[newc[1]][newc[0]] = 4;
            this.y = newc[1];
            this.x = newc[0];
            let newX = newc[0];
            let newY = newc[1];
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
            var enemie = random(this.chooseCell(3));
            var runplace = this.chooseCell(0);
            var enemiedirect = [];
            if (enemie && runplace) {
                for (var h in wolfArr) {
                    if (wolfArr[h].x == enemie[0] && wolfArr[h].y == enemie[1]) {
                        let x = enemie[0];
                        let y = enemie[1];
                        enemiedirect = [
                            [x - 1, y - 1],
                            [x, y - 1],
                            [x + 1, y - 1],
                            [x - 1, y],
                            [x + 1, y],
                            [x - 1, y + 1],
                            [x, y + 1],
                            [x + 1, y + 1],
                        ];
                        break;
                    }
                }

                for (var r in runplace) {
                    var tff = true;
                    for (var j in enemiedirect) {
                        if (enemiedirect[j][0] >= 0 && enemiedirect[j][0] < matrix[0].length && enemiedirect[j][1] >= 0 && enemiedirect[j][1] < matrix.length) {
                            if (runplace[r][0] == enemiedirect[j][0] && runplace[r][1] == enemiedirect[j][1]) {
                                tff = false;
                                break;
                            }
                        }
                    }
                    if (tff) {
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