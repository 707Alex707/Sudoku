const rows = 9;
const cols = 9;
const defaultValue = 0;
var puzzle;

document.getElementById("slider").oninput = function () {
    genTable();
    puzzle = Array(rows).fill(null).map(_ => Array(cols).fill(defaultValue));
    recursiveFill(0, 0, 0);
    writepuzzle(puzzle);
    removevalues(this.value);
    console.log(puzzle);
};

document.getElementById("solbtn").onclick = function () {
    writepuzzle(puzzle);
};

document.getElementById("hintbtn").onclick = function () {

    var locations = [];
    var size = 0;
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (!(parseInt(document.getElementById(x + "" + y).innerHTML) > 0)) {
                locations[size] = x + "-" + y;
                size++;
               
            }
        }
    }
    if(size > 0){
        var ran = ranInt(size);
        var array = locations[ran].split('-');
        document.getElementById(array[0] + "" + array[1]).innerHTML = puzzle[parseInt(array[1])][parseInt(array[0])];
    }

};

function genTable() {

    var html = "<table>";

    for (var x = 0; x < 9; x++) {
        html = html + "<tr>";
        var y;
        for (y = 0; y < 9; y++) {
            //html = html + "<td id=" + y + x + ">" + y + "_" + x + "</td>";
            html = html + "<td id= cell_" + y + x + "> <div id=" + y + x + "> </td>";
        }
        html = html + "</tr>";
    }

    html = html + "</table>";

    document.getElementById("sudoku-table").innerHTML = html;
}

// Scans a row and returns an array of values
function scanx(y) {
    var values = [];

    for (var i = 0; i < 9; i++) {
        values[i] = puzzle[y][i];
    }
    return values;
}

// Scans a column and returns an array of values
function scany(x) {

    var values = [];

    for (var i = 0; i < 9; i++) {
        values[i] = puzzle[i][x];
    }
    return values;
}

// Scans a 3x3 box and returns an array of values
function scanbox(x, y) {

    var values = [];
    var count = 0;

    //Gets which 3x3 box its in
    x = Math.floor(x / 3);
    y = Math.floor(y / 3);

    for (var j = (y * 3); j <= (y * 3 + 2); j++) {

        for (var i = (x * 3); i <= (x * 3 + 2); i++) {
            values[count] = puzzle[j][i];
            count++;
        }
    }
    return values;
}

//Finds possible values for a given square
function possibleval(x, y, value) {

    var values_x = scanx(y);
    var values_y = scany(x);
    var values_xy = scanbox(x, y);

    //creates an array of possible values, removes them if they are found
    var values_possible = [];
    for (var i = 0; i < 9; i++) {
        if ((i + 1) !== value) {
            values_possible[i] = i + 1;
        }
    }

    removecommon(values_possible, values_x);
    removecommon(values_possible, values_y);
    removecommon(values_possible, values_xy);

    for (var i = 0; i < values_possible.length; i++) {
        if (typeof (values_possible[i]) == "undefined") {
            values_possible.splice(i);
        }
    }

    if (values_possible.length === 0) {
        values_possible[0] = 0;
    }

    return values_possible;
}

function scan0() {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {

            if (document.getElementById(x + "" + y).innerHTML === 0) {
                return true;
            }
        }
    }
    return false;
}

function ranInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function removecommon(array1, temp) {

    var array2 = [];
    for (var i = 0; i < temp.length; i++) {
        array2[i] = parseInt(temp[i]);
    }

    var index;
    for (var i = 0; i < array2.length; i++) {
        index = array1.indexOf(array2[i]);
        if (index > -1) {
            array1.splice(index, 1);
        }
    }
    return array1;
}

// Fills the table
function recursiveFill(x, y, value) {

    var setvalue = possibleval(x, y, value);
    puzzle[y][x] = setvalue[ranInt(setvalue.length)];

    // If a zero or undefined is found, go back one space
    if (puzzle[y][x] === 0) {
        if (x - 1 < 0) {
            x = 8;
            y--;
        }
        recursiveFill(x - 1, y, puzzle[y][(x - 1)]);

    } else {

        x++;
        if (x > 8) {
            x = 0;
            y++;
        }
        if (y === 9) {
            console.log("Puzzle Generated");

        } else {

            recursiveFill(x, y, 0);
        }
    }
}

//Returns stored puzzle values from document
function storeToArray() {
    var values = Array(rows).fill(null).map(_ => Array(cols).fill(defaultValue)); //creates 9x9 array

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            values[y][x] = parseInt(document.getElementById(x + "" + y).innerHTML);
        }
    }
    return values;
}

//Removes elements based on a probability input
function removevalues(chance) {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (ranInt(chance) >= 5) {
                document.getElementById(x + "" + y).innerHTML = "<input type='text' maxlength='1' onkeyup='filterInputBox(this)'>";

            }
        }
    }
}

//Writes puzzle to html document
function writepuzzle(inpuzzle) {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            document.getElementById(x + "" + y).innerHTML = inpuzzle[y][x];
        }
    }
}

function filterInputBox(obj){
    obj.value = obj.value.replace(/[^0-9]|[1-9]{2,}/g, '');
    obj.style.color = '#04a8f4';
}

