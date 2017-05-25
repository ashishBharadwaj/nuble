// global variables for storing the grid as an array, position of the empty box and the solve state 
var arrValues = [];
var emptyPosX, emptyPosY;
var arraySolveState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var solveStatePosX = 3;
var solveStatePosY = 3;
var arrGameState = [];

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

// function to generate an random number within a given range
// @param: min : start range (inclusive) 
// @param: max : end range (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    var emptyPos = document.getElementById("empty").getAttribute("data-index");

    if (isSorted(arrValues)) {
        alert("You have successfully solved the puzzle!!!!");
    }
}

// function to populate the game grid 
function populateGameGrid(isAutoSolve) {
    var i = 0,
        j = 0,
        ei = 0,
        ej = 0,
        count = 0,
        htmlChunk = "",
        gameGrid = document.getElementById("gameGridContainer");


    if (isAutoSolve) {
        arrValues = arraySolveState.slice();
        ei = solveStatePosX;
        ej = solveStatePosY;
    } else {
        arrValues = generateRandomArray(16);
        ei = getRandomInt(0, 3);
        ej = getRandomInt(0, 3);
    }

    arrGameState = [];
    gameGrid.innerHTML = "";
    emptyPosX = ei;
    emptyPosY = ej;
    swapArrElement(arrValues.indexOf(16), ei * 4 + ej);

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
}

// function invoked wehn a grid element is clicked 
// @param: obj : reference of the current context
function move(obj) {
    var posX = parseInt(obj.getAttribute("data-index").split(",")[0]),
        posY = parseInt(obj.getAttribute("data-index").split(",")[1]),
        emptyDiv = document.getElementById("empty"),
        emptyPosX = parseInt(emptyDiv.getAttribute("data-index").split(",")[0]),
        emptyPosY = parseInt(emptyDiv.getAttribute("data-index").split(",")[1]);

    if ((posX - 1 === emptyPosX && posY === emptyPosY) || (posX + 1 === emptyPosX && posY === emptyPosY) ||
        (posX === emptyPosX && posY - 1 === emptyPosY) || (posX === emptyPosX && posY + 1 === emptyPosY)) {
        swapTile(obj, posX, posY);
        arrGameState.push("" + emptyPosX + "," + emptyPosY);
    }
}

function undoGameGrid() {
    var index = arrGameState[arrGameState.length - 1],
        posX = parseInt(arrGameState[arrGameState.length - 1].split(",")[0]),
        posY = parseInt(arrGameState[arrGameState.length - 1].split(",")[1]);

    swapTile(document.querySelectorAll("[data-index='" + index + "']")[0], posX, posY);
    arrGameState.pop();
}


// function to bind the button click event 
function bindButtonClick() {
    var newGame = document.getElementById("newGame");
    var autoSolve = document.getElementById("autoSolve");
    var undo = document.getElementById("undo");

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