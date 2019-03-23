genTable();
fillTable();


function genTable() {

    var html;

    html = "<table>";

    var x;
    for(x = 0; x < 9; x++){
        html = html + "<tr>";
        var y;
        for(y = 0; y < 9; y++){
            //html = html + "<td id=" + y + x + ">" + y + "_" + x + "</td>";
            html = html + "<td id=" + y + x + ">" + "</td>";
        }
        html = html + "</tr>";
    }

    html = html + "</table>";

    document.getElementById("sudoku-table").innerHTML = html;
}


function scanx(y) {
    var i;
    var values = [];

    for(i = 0; i < 9; i++){
        values[i] = document.getElementById(i + "" + y).innerHTML;
        //console.log(values[i]);
    }
    return values;
}

function scany(x) {
    var i;
    var values = [];

    for(i = 0; i < 9; i++){
        values[i] = document.getElementById(x + "" + i).innerHTML;
        //console.log(values[i]);Maple Test 3
    }
    return values;
}

function scanbox(x, y) {

    var values = [];
    var count = 0;
    console.log("Square x:" + x + " " + "y:" + y);

    //Gets which 3x3 box its in
    x = Math.floor(x/3);
    y = Math.floor(y/3);
    console.log("Box pos x:" + x + " y:" + y);
    console.log("xmin:" + (x*3) + " ymin:" + (y*3));
    console.log("xmax:" + (x*3 + 2) + " Ymax:" + (y*3+2));

    for(var j = (y*3); j <= (y*3 + 2); j++){

        for(var i = (x*3); i <= (x*3 + 2); i++){
            values[count] = document.getElementById(i + "" + j).innerHTML;
            count++;
            console.log(values[count-1]);
        }
    }
    return values;
}

//Untested
function possibleval(x, y) {

    var values_x = scanx(y);
    var values_y = scany(x);
    var values_xy = scanbox(x, y);

    //creates an array of possible values, removes them if they are found
    var values_possible = [];
    for(var i = 0; i < 9; i++){
        values_possible [i] = i + 1;
    }


    removecommon(values_possible, values_x);
    removecommon(values_possible, values_y);
    console.log(values_xy);
    removecommon(values_possible, values_xy);




    if(values_possible.length === 0){
        values_possible[0] = 0;
    }


    return values_possible;
}

function scan0(){
    for(var y = 0; y < 9; y++){
        for(var x = 0; x < 9; x++){

            if(document.getElementById(x+ "" + y).innerHTML == 0){
                return true;
            }

        }
    }

    return false;

}

function ranInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function removecommon(array1, temp){


    var array2 = [];
    var values_possible = [];
    for(var i = 0; i < temp.length; i++){
        array2[i] = parseInt(temp[i]);
    }


    //var array1 = ['1', '2', '3', '4', '5'];
    //var array2 = ['4', '5'];
    var index;
    for (var i=0; i<array2.length; i++) {
        index = array1.indexOf(array2[i]);
        if (index > -1) {
            array1.splice(index, 1);
        }
    }

    return array1;
}

function fillTable() {
    for(var y = 0; y < 9; y++){
        for(var x = 0; x < 9; x++){

            var setvalue = possibleval(x, y);
            document.getElementById(x+ "" + y).innerHTML = setvalue[ranInt(setvalue.length)];

            /*
            if(document.getElementById(8+ "" + 8).innerHTML != 0){
                console.log("sudoku puzzle generated sucessfully");
            } else {
                var values = possibleval(x, y);
                if(values[0] != 0){
                    fillTable()
                } else {

                }
            }
            */

        }
    }
}

function storeToArray(){
    var values = [[]];

    for(var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            values = parseInt(document.getElementById(x+ "" + y).innerHTML);
        }
    }
    console.log(values);
    return values;
}