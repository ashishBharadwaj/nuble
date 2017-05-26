// global variables for storing the grid as an array, position of the empty box and the solve state 
var arrValues = [];
var emptyPosX, emptyPosY;
var arraySolveState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var solveStatePosX = 3;
var solveStatePosY = 3;
var arrGameState = [];
var moves = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeOut;
// function to generate an array of random numbers 
// @param: size : size of the array 
function generateRandomArray(size) {
    var arrValues = [];
    while (arrValues.length < size) {
        var randomnumber = Math.ceil(Math.random() * size)
        if (arrValues.indexOf(randomnumber) > -1) continue;
        arrValues[arrValues.length] = randomnumber;
    }
    return arrValues;
}

// function to convert one dimentional array to 2 dimentional array 
// @param: arr : input 1D array 
function convertTo2D(arr) {
    var arr2D = [],
        i = 0,
        j = 0;
    for (i = 0; i < 4; i++) {
        arr2D[i] = [];
        for (j = 0; j < 4; j++) {
            arr2D[i][j] = arr[i * 4 + j];
        }
    }
    return arr2D;
}

// function to check if an array is sorted 
function isSorted(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}

// function to swap the clicked element with an empty cell
// @param: obj : reference of the current context
// @param: posX : x cordinate in the grid
// @param: posY : x cordinate in the grid
function swapTile(obj, posX, posY) {
    var emptyDiv = document.getElementById("empty");

    emptyDiv.innerHTML = obj.innerHTML;
    emptyDiv.removeAttribute("id");
    obj.setAttribute("id", "empty");
    obj.innerHTML = "";
    emptyPosX = posX;
    emptyPosY = posY;
    swapArrElement(arrValues.indexOf(16), posX * 4 + posY);
    check();
}

// function to swap two elements of global array
function swapArrElement(i, j) {
    var temp = arrValues[i];

    arrValues[i] = arrValues[j];
    arrValues[j] = temp;
}

// function to check if puzzle is solved
function check() {
    if (isSorted(arrValues)) {
        alert("You have successfully solved the puzzle!!!!");
    }
}

function timer() {
    timeOut = setTimeout(add, 1000);
}

function add() {
    var timeDiv = document.getElementById("time");
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timeDiv.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
// function to populate the game grid 
function populateGameGrid(isAutoSolve) {
    var i = 0,
        j = 0,
        ei = 0,
        ej = 0,
        count = 0,
        grid2D = [
            []
        ],
        htmlChunk = "",
        movesDiv = document.getElementById("moves"),
        timeDiv = document.getElementById("time"),
        gameGrid = document.getElementById("gameGridContainer");

    if (isAutoSolve) {
        arrValues = arraySolveState.slice();
        ei = solveStatePosX;
        ej = solveStatePosY;
    } else {
        arrValues = generateRandomArray(16);
        grid2D = convertTo2D(arrValues);
        while (!isSolvable(grid2D)) {
            arrValues = generateRandomArray(16);
            grid2D = convertTo2D(arrValues);
        }
        for (i = 0; i < grid2D.length; i++) {
            for (j = 0; j < grid2D[0].length; j++) {
                if (grid2D[i][j] === 16) {
                    ei = i;
                    ej = j;
                }
            }
        }
    }

    moves = 0;
    movesDiv.innerHTML = "0";
    arrGameState = [];
    gameGrid.innerHTML = "";
    emptyPosX = ei;
    emptyPosY = ej;

    for (i = 0; i < 4; i++) {
        htmlChunk += "<div class='row'>";
        for (j = 0; j < 4; j++, count++) {
            if (i === ei && j === ej) {
                htmlChunk += "<div class='column' id='empty' onClick='move(this)' data-index='" + i + "," + j + "'></div>";
            } else {
                htmlChunk += "<div class='column' data-index='" + i + "," + j + "' onClick='move(this)'>" + arrValues[count] + "</div>";
            }

        }
        htmlChunk += "</div>";
    }

    gameGrid.innerHTML = htmlChunk;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timeDiv.innerHTML = "00:00:00";
    clearTimeout(timeOut);
    timer();
}

// function invoked wehn a grid element is clicked 
// @param: obj : reference of the current context
function move(obj) {
    var posX = parseInt(obj.getAttribute("data-index").split(",")[0]),
        posY = parseInt(obj.getAttribute("data-index").split(",")[1]),
        emptyDiv = document.getElementById("empty"),
        movesDiv = document.getElementById("moves"),
        emptyPosX = parseInt(emptyDiv.getAttribute("data-index").split(",")[0]),
        emptyPosY = parseInt(emptyDiv.getAttribute("data-index").split(",")[1]);

    if ((posX - 1 === emptyPosX && posY === emptyPosY) || (posX + 1 === emptyPosX && posY === emptyPosY) ||
        (posX === emptyPosX && posY - 1 === emptyPosY) || (posX === emptyPosX && posY + 1 === emptyPosY)) {
        swapTile(obj, posX, posY);
        arrGameState.push("" + emptyPosX + "," + emptyPosY);
        moves += 1;
        movesDiv.innerHTML = "" + moves;
    }
}

// function to restore the state of game on click of undo button
function undoGameGrid() {
    var index = arrGameState[arrGameState.length - 1],
        movesDiv = document.getElementById("moves"),
        posX = parseInt(arrGameState[arrGameState.length - 1].split(",")[0]),
        posY = parseInt(arrGameState[arrGameState.length - 1].split(",")[1]);

    swapTile(document.querySelectorAll("[data-index='" + index + "']")[0], posX, posY);
    arrGameState.pop();
    moves -= 1;
    movesDiv.innerHTML = "" + moves;
}


// function to bind the button click event 
function bindButtonClick() {
    var newGame = document.getElementById("newGame"),
        autoSolve = document.getElementById("autoSolve"),
        undo = document.getElementById("undo");

    newGame.addEventListener('click', function() {
        populateGameGrid();
    });
    autoSolve.addEventListener('click', function() {
        populateGameGrid(true);
    });
    undo.addEventListener('click', function() {
        if (arrGameState.length) {
            undoGameGrid();
        }
    });
}

(function() {
    populateGameGrid();
    bindButtonClick();
})();