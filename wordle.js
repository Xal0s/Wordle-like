
var height = 6; // Nb d'essai
var width = 5; // longeur du mot

var row = 0; // numéro de tentative
var col = 0; // lettre actuelle pour cette tentative

var gameOver = false;
var word = "SQUID";


window.onload = fonction(){
    i ntialize();
}
    

function intializ() {

    //créer le tableau du jeu
    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++) {
            // <span id = "0-0" class="tile"></span>
            let tile = document.createElement("span");
            tile.id = r.toString() +"-" + c.toString();
            tile.classList.add("tile");
            tile.innerText= "P";
            document.getElementById("Tableau").appendChild(tile);
        }
    }
}
