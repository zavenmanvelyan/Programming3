class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }



}



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
            var tf = random(this.chooseCell(1));
            if (tf == undefined) {
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
        var newcg = random(this.chooseCell(1));
        if (newcg) {
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            matrix[newcg[1]][newcg[0]] = 2;
            this.y = newcg[1];
            this.x = newcg[0];
            let newX = newcg[0];
            let newY = newcg[1];
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
        else{
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
            else{
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
        else{
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



