
var height = 6; //nb essai
var width = 5; //longeur du mot

var row = 0; //estimation actuelle (tentative #)
var col = 0; //lettre actuelle pour cette tentative

var gameOver = false;
// var word = "SQUID";
var wordList = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp", "trawl", "outdo", "adobe", "crazy", "sower", "repay", "digit", "crate", "cluck", "spike", "mimic", "pound", "maxim", "linen", "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory", "seedy", "print", "yearn", "drain", "bribe", "stout", "panel", "crass", "flume", "offal", "agree", "error", "swirl", "argue", "bleed", "delta", "flick", "totem", "wooer", "front", "shrub", "parry", "biome", "lapel", "start", "greet", "goner", "golem", "lusty", "loopy", "round", "audit", "lying", "gamma", "labor", "islet", "civic", "forge", "corny", "moult", "basic", "salad", "agate", "spicy", "spray", "essay", "fjord", "spend"]
//liste wordList contient des mots qui pourraient être devinés
var guessList = ["aahed", "aalii", "aargh", "aarti", "abaca", "abaci", "abacs", "abaft", "abaka", "abamp", "aband", "abash", "abask", "abaya", "abbas", "abbed", "abbes", "abcee", "abeam", "abear", "abele", "abers", "abets", "abies", "abler", "ables", "ablet", "ablow", "abmho", "abohm", "aboil", "aboma", "aboon", "abord", "abore", "abram", "abray", "abrim", "abrin", "abris", "absey", "absit"]
//la liste guessList contient des mots déjà devinés. 
guessList = guessList.concat(wordList); 
//Ces deux listes sont fusionnées pour créer une liste complète de mots possibles.
var word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase(); //Le mot à deviner est choisi au hasard à partir de wordList et stocké dans la variable word. Ensuite, ce mot est converti en majuscules.
console.log(word);

window.onload = function(){ //La fonction window.onload est utilisée pour exécuter la fonction intialize une fois que la page est entièrement chargée.
    intialize(); 
}


function intialize() { //la fonction intialize génère la grille de jeu et le clavier virtuel. La grille de jeu est créée en utilisant des balises <span> avec des identifiants pour identifier chaque case. Le clavier virtuel est construit à partir d'une matrice de lettres et de touches spéciales, avec des gestionnaires d'événements pour chaque bouton.

    // Creer la grille du jeu
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Creer le clavier Virtuel
    let keyboard = [
        ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["Q ", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            } 

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
    
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey() {
    e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        update();
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("reponse").innerText = word;
    }
}

function update() { //La fonction update est appelée lorsqu'un mot est soumis. Elle vérifie d'abord si le mot soumis est dans la liste des mots possibles (guessList). Si ce n'est pas le cas, un message indiquant que le mot n'est pas dans la liste est affiché.

    let guess = "";
    document.getElementById("reponse").innerText = "";

    //Ensuite, la fonction vérifie quelles lettres sont correctes (à la bonne position) et quelles lettres sont présentes (mais à la mauvaise position). Ces informations sont utilisées pour mettre en forme visuellement la grille.

    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase(); //case sensitive
    console.log(guess);

    if (!guessList.includes(guess)) {
        document.getElementById("reponse").innerText = "Pas dans le Dictionaire";
        return;
    }
    
    //commencer à traiter la supposition
    let correct = 0;

    let letterCount = {}; //garder une trace de la fréquence des lettres, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    //Première itération, vérifiez d'abord toutes les bonnes
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Est-il dans la bonne position?
        if (word[c] == letter) {
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");

            correct += 1;
            letterCount[letter] -= 1; //Déduire le nombre de lettres
        }

        if (correct == width) {
            gameOver = true;
        }
    }

    console.log(letterCount);
    //recommencez et marquez lesquels sont présents mais en mauvaise position
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // Ignorer la lettre si elle a été marquée comme correcte
        if (!currTile.classList.contains("correct")) {
            //Est-ce dans le mot ?         //Assurez-vous que nous ne comptons pas deux fois
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } // Pas dans le mot ou (était dans le mot mais toutes les lettres ont été utilisées pour éviter le surcompte)
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter);
                keyTile.classList.add("absent")
            }
        }
    }
function showVictoryScreen(score, attempts) {
        const victoryScreen = document.getElementById("victory-screen");
        const scoreElement = document.getElementById("score");
        const attemptsElement = document.getElementById("attempts");
      
        scoreElement.textContent = score;
        attemptsElement.textContent = attempts;
      
        victoryScreen.classList.remove("hidden");
      }

        const playAgainButton = document.getElementById("play-again");
        playAgainButton.addEventListener("click", () => {
            resetGame(); // Remettez le jeu à zéro ici
            showVictoryScreen.classList.add("hidden");

      });
      





    row += 1; //commencer une nouvelle ligne
    col = 0; //commencer à 0 pour une nouvelle ligne
}