var height = 6; // Nombre d'essais
var width = 5; // Longueur du mot

var row = 0; // Estimation actuelle (tentative #)
var col = 0; // Lettre actuelle pour cette tentative

var gameOver = false;
//wordList contient des mots qui pourraient être devinés
var wordList = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp", "trawl", "outdo", "adobe", "crazy", "sower", "repay", "digit", "crate", "cluck", "spike", "mimic", "pound", "maxim", "linen", "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory", "seedy", "print", "yearn", "drain", "bribe", "stout", "panel", "crass", "flume", "offal", "agree", "error", "swirl", "argue", "bleed", "delta", "flick", "totem", "wooer", "front", "shrub", "parry", "biome", "lapel", "start", "greet", "goner", "golem", "lusty", "loopy", "round", "audit", "lying", "gamma", "labor", "islet", "civic", "forge", "corny", "moult", "basic", "salad", "agate", "spicy", "spray", "essay", "fjord", "spend"];

//la liste guessList contient des mots déjà devinés.
var guessList = ["aahed", "aalii", "aargh", "aarti", "abaca", "abaci", "abacs", "abaft", "abaka", "abamp", "aband", "abash", "abask", "abaya", "abbas", "abbed", "abbes", "abcee", "abeam", "abear", "abele", "abers", "abets", "abies", "abler", "ables", "ablet", "ablow", "abmho", "abohm", "aboil", "aboma", "aboon", "abord", "abore", "abram", "abray", "abrim", "abrin", "abris", "absey", "absit"];
//Ces deux listes sont fusionnées pour créer une liste complète de mots possibles.
guessList = guessList.concat(wordList);

//Le mot à deviner est choisi au hasard à partir de wordList et stocké dans la variable word. Ensuite, ce mot est converti en majuscules.
console.log(word);
var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word); 
var score = 0;
var successfulAttempts = 0;
//La fonction window.onload est utilisée pour exécuter 
window.onload = function () {
  intialize(); //la fonction intialize une fois que la page est entièrement chargée.
}

function intialize() {
  // Creer la grille du jeu
  score = 0;
  successfulAttempts = 0;
  gameOver = false;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + '-' + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Creer le clavier Virtuel
  let keyboard = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["Enter", "W", "X", "C", "V", "B", "N", "⌫"]
  ];

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
        keyTile.id = "Key" + key;
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
  });
}

function processKey() {
  e = { "code": this.id };
  processInput(e);
}

function processInput(e) {
  if (gameOver) return;

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
      col -= 1;
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
    if (successfulAttempts > 0) {
      showVictoryScreen();
    }
  }
}
//La fonction update est appelée lorsqu'un mot est soumis. Elle vérifie d'abord si le mot soumis est dans la liste des mots possibles (guessList). Si ce n'est pas le cas, un message indiquant que le mot n'est pas dans la liste est affiché.
function update() {
  let guess = "";
  document.getElementById("reponse").innerText = "";
//Ensuite, la fonction vérifie quelles lettres sont correctes (à la bonne position) et quelles lettres sont présentes (mais à la mauvaise position). Ces informations sont utilisées pour mettre en forme visuellement la grille.
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;
    guess += letter;
  }

  guess = guess.toLowerCase();
  console.log(guess);

  if (!guessList.includes(guess)) {
    document.getElementById("reponse").innerText = "Pas dans le Dictionaire";
    return;
  }
  //commencer a traiter les suggestion
  let correct = 0;
  let letterCount = {};
  ////garder une trace de la séquence des lettres; ex Willy—->{ W:1 ,  E:1, N:2, Y: 1}
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (letterCount[letter]) {
      letterCount[letter] += 1;
    }
    else {
      letterCount[letter] = 1;
    }
  }
    //Première itération, vérifiez d’abord toutes les bonnes lettres
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;

    if (word[c] == letter) {
      currTile.classList.add("correct");

      let keyTile = document.getElementById("Key" + letter);
      keyTile.classList.remove("present");
      keyTile.classList.add("correct");

      correct += 1;
      letterCount[letter] -= 1;
    }

    if (correct == width) {
      gameOver = true;
      successfulAttempts++;
      score += width - row + 1;
      document.getElementById("reponse").innerText = word;
      showVictoryScreen();
    }
  }
  //recommencez et marquez lesquels sont présents mais en mauvaise position
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;
    //ignorer la lettre si elle marquer correct
    if (!currTile.classList.contains("correct")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        currTile.classList.add("present");

        let keyTile = document.getElementById("Key" + letter);
        if (!keyTile.classList.contains("correct")) {
          keyTile.classList.add("present");
        }
        letterCount[letter] -= 1;
      } else {
        currTile.classList.add("absent");
        let keyTile = document.getElementById("Key" + letter);
        keyTile.classList.add("absent");
      }
    }
  }

  row += 1;
  col = 0;
}
// Affiche l'écran de victoire
function showVictoryScreen() {
  var victoryScreen = document.getElementById("victory-screen");
  victoryScreen.style.display = "block";
  document.getElementById("score").innerText = score;
  document.getElementById("attempts").innerText = successfulAttempts;
}


// Ajoutez la fonction pour afficher l'écran de défaite
function showDefeatScreen() {
  defeatScreen.style.display = "block";
// Ajoutez ces lignes pour gérer l'écran de défaite
  var defeatScreen = document.getElementById("defeat-screen");
  var defeatButton = document.getElementById("replay-button");
  defeatButton.addEventListener("click", resetGame);
}
// Dans la fonction update(), vérifiez si le joueur a épuisé tous les essais
if (!gameOver && row === height) {
  gameOver = true;
  document.getElementById("reponse").innerText = word;
  if (successfulAttempts > 0) {
    showVictoryScreen();
  } else {
    showDefeatScreen();
  }
}   




//document.getElementById("play-again").addEventListener("click", intialize()); 
  
  //intialize()
 // var victoryScreen = document.getElementById("victory-screen");
 // victoryScreen.style.display = "none";

