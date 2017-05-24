function populateGameGrid(){
    var i=0, j=0, count=0;
    var htmlChunk = "";
    var gameGrid= document.getElementById("gameGridContainer");
    var arrValues = generateRandomArray();
    var ei = getRandomInt(0,3),
        ej = getRandomInt(0,3);
    for(i=0;i<4;i++){
        htmlChunk += "<div class='row'>";
        for(j=0;j<4;j++){
            if(i === ei && j === ej){
                htmlChunk += "<div class='column empty' data-index='" + i +","+ j + "'></div>";
            }else{
                htmlChunk += "<div class='column' data-index='" + i +","+ j + "'>" + arrValues[count] + "</div>";
                count++;
            }
            
        }
        htmlChunk += "</div>";
    }
    gameGrid.innerHTML = htmlChunk;
}

function generateRandomArray(){
    var arrValues = [];
    while(arrValues.length < 15){
        var randomnumber = Math.ceil(Math.random()*15)
        if(arrValues.indexOf(randomnumber) > -1) continue;
        arrValues[arrValues.length] = randomnumber;
    }
    return arrValues;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function(){
    populateGameGrid();
}) ();