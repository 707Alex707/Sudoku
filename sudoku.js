const rows = 9;
const cols = 9;
const defaultValue = 0;
var puzzle = Array(rows).fill(null).map(_ => Array(cols).fill(defaultValue)); //Stored puzzle[y][x] as its an array of arrays


function genTable() {

    var html = "<table>";

    for (var x = 0; x < 9; x++) {
        html = html + "<tr>";
        var y;
        for (y = 0; y < 9; y++) {
            //html = html + "<td id=" + y + x + ">" + y + "_" + x + "</td>";
            html = html + "<td id=" + y + x + ">" + "</td>";
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
        values[i] = document.getElementById(i + "" + y).innerHTML;
    }
    return values;
}

// Scans a column and returns an array of values
function scany(x) {

    var values = [];

    for (var i = 0; i < 9; i++) {
        values[i] = document.getElementById(x + "" + i).innerHTML;
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
            values[count] = document.getElementById(i + "" + j).innerHTML;
            count++;
        }
    }
    return values;
}

//Untested
function possibleval(x, y, value) {

    var values_x = scanx(y);
    var values_y = scany(x);
    var values_xy = scanbox(x, y);

    //creates an array of possible values, removes them if they are found
    var values_possible = [];
    for (var i = 0; i < 9; i++) {
        if ((i + 1) != value) {
            values_possible[i] = i + 1;
        }
    }

    removecommon(values_possible, values_x);
    removecommon(values_possible, values_y);
    removecommon(values_possible, values_xy);

    for(var i = 0; i < values_possible.length; i++){
        if(typeof(values_possible[i]) == "undefined"){
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

            if (document.getElementById(x + "" + y).innerHTML == 0) {
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
    document.getElementById(x + "" + y).innerHTML = setvalue[ranInt(setvalue.length)];

    // If a zero or undefined is found, go back one space
    if (document.getElementById(x + "" + y).innerHTML == 0) {
        if (x - 1 < 0) {
            x = 8;
            y--;
        }
        
        recursiveFill(x - 1, y, document.getElementById((x - 1) + "" + y).innerHTML);

    } else {

        x++;
        if (x > 8) {
            x = 0;
            y++;
        }
        if (y == 9) {
            console.log("Puzzle Generated");

        } else {

            recursiveFill(x, y, 0);
        }
    }
}

function storeToArray() {
    //var values;
    const rows = 9;
    const cols = 9;
    const defaultValue = 0;
    var values = Array(rows).fill(null).map(_ => Array(cols).fill(defaultValue));

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            values[y][x] = parseInt(document.getElementById(x + "" + y).innerHTML);
        }
    }
    return values;
}

document.getElementById("slider").oninput = function() {
    genTable();
    puzzle = Array(rows).fill(null).map(_ => Array(cols).fill(defaultValue));
    recursiveFill(0,0,0);
    //writepuzzle(puzzle);
    //removevalues(this.value);
};

function removevalues(chance){

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if(ranInt(chance) >= 5){
                document.getElementById(x + "" + y).innerHTML = "";
            }
        }
    }
}

function writepuzzle(inpuzzle){

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            document.getElementById(x + "" + y).innerHTML = inpuzzle[y][x];

        }
    }
}
