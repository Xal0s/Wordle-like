var height = 6;
var width = 5;
var totalAttempts = 0;
var score = 0;
var successfulAttempts = 0;
var gameOver = false;
var correct = 0;
var attemptsOnWord = 0;

// Fonction appelée lorsque la page est chargée
window.onload = function () {
  initialize();
  // Récupération des statistiques depuis le localStorage
  var storedScore = localStorage.getItem("score");
  var storedAttempts = localStorage.getItem("attempts");
  var storedWinPercentage = localStorage.getItem("winPercentage");
  var storedSuccessfulAttempts = localStorage.getItem("successfulAttempts");

  // Affichage des statistiques si elles existent
  if (storedScore !== null && storedAttempts !== null && storedWinPercentage !== null && storedSuccessfulAttempts !== null) {
    score = parseInt(storedScore, 10);
    totalAttempts = parseInt(storedAttempts, 10);
    successfulAttempts = parseInt(storedSuccessfulAttempts, 10);

    document.getElementById("score").innerText = score;
    document.getElementById("attempts").innerText = successfulAttempts + " sur " + totalAttempts;
    document.getElementById("win-percentage").innerText = storedWinPercentage + "%";
  }
}

// Fonction d'initialisation du jeu
function initialize() {
  score = 0;
  successfulAttempts = 0;
  totalAttempts = 0;
  correct = 0;
  attemptsOnWord = 0;
  gameOver = false;

  // Création des deux tableaux de jeu
  createGameTable("board1");
  createGameTable("board2");

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

// Fonction appelée lorsqu'une touche du clavier est cliquée
function processKey() {
  var e = { "code": this.id };
  processInput(e);
}

// Fonction de traitement de l'entrée utilisateur
function processInput(e) {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    let col = getCurrentCol();
    let currTile = document.getElementById("board1-" + col);
    if (currTile.innerText == "") {
      currTile.innerText = e.code[3];
      col += 1;
      setCurrentCol(col);
    }
  }
  else if (e.code == "Backspace") {
    let col = getCurrentCol();
    if (0 < col && col <= width) {
      col -= 1;
      setCurrentCol(col);
    }
    let currTile = document.getElementById("board1-" + col);
    currTile.innerText = "";
  }
  else if (e.code == "Enter") {
    update();
  }
}

// Fonction de mise à jour du jeu
function update() {
  let guess = "";
  document.getElementById("reponse").innerText = "";

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById("board1-" + c);
    let letter = currTile.innerText;
    guess += letter;
  }

  guess = guess.toUpperCase();
  attemptsOnWord += 1; // Incrémente le nombre total d'essais

  if (!wordList.includes(guess)) {
    document.getElementById("reponse").innerText = "Pas dans le Dictionnaire";
    return;
  }

  let letterCount = {};

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (letterCount[letter]) {
      letterCount[letter] += 1;
    }
    else {
      letterCount[letter] = 1;
    }
  }

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById("board1-" + c);
    let letter = currTile.innerText;

    if (word[c] == letter) {
      currTile.classList.add("correct");

      let keyTile = document.getElementById("Key" + letter);
      keyTile.classList.remove("present");
      keyTile.classList.add("correct");

      correct += 1;
      letterCount[letter] -= 1;
    }
  }

  // Vérification de la victoire après la boucle
  if (correct === width) {
    gameOver = true;
    successfulAttempts++;
    totalAttempts += 1; // Incrémente le nombre total d'essais
    score += width - attemptsOnWord + 1;
    document.getElementById("reponse").innerText = word;
    showVictoryScreen();
  }

  // Vérification de la défaite après la boucle
  if (!gameOver && attemptsOnWord === 6) {
    totalAttempts += 1; // Incrémente le nombre total d'essais
    gameOver = true;
    showDefeatScreen();
  }

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById("board1-" + c);
    let letter = currTile.innerText;

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
  setCurrentCol(0);
}

// Fonction d'affichage de l'écran de victoire
function showVictoryScreen() {
  var victoryScreen = document.getElementById("victory-screen");

  if (victoryScreen) {
    // Calcul du pourcentage de victoire
    let winPercentage = (successfulAttempts / totalAttempts) * 100;

    // Sauvegarde des statistiques dans le localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("attempts", totalAttempts);
    localStorage.setItem("winPercentage", winPercentage.toFixed(2));
    localStorage.setItem("successfulAttempts", successfulAttempts);

    // Affichage des statistiques
    document.getElementById("score").innerText = score;
    document.getElementById("attempts").innerText = successfulAttempts + " sur " + totalAttempts;
    document.getElementById("win-percentage").innerText = winPercentage.toFixed(2) + "%";

    victoryScreen.style.display = "block";
  }
}

// Fonction d'affichage de l'écran de défaite
function showDefeatScreen() {
  var defeatScreen = document.getElementById("defeat-screen");

  if (defeatScreen) {
    // Calcul du pourcentage de victoire
    let winPercentage = (successfulAttempts / totalAttempts) * 100;

    // Sauvegarde des statistiques dans le localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("attempts", totalAttempts);
    localStorage.setItem("winPercentage", winPercentage.toFixed(2));
    localStorage.setItem("successfulAttempts", successfulAttempts);

    // Affichage des statistiques
    document.getElementById("score_defeat").innerText = score;
    document.getElementById("attempts_defeat").innerText = successfulAttempts + " sur " + totalAttempts;
    document.getElementById("win-percentage_defeat").innerText = winPercentage.toFixed(2) + "%";

    defeatScreen.style.display = "block";
  }
}

// Fonction pour créer un tableau de jeu
function createGameTable(tableId) {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = tableId + '-' + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById(tableId).appendChild(tile);
    }
  }
}

// Fonction pour obtenir la colonne actuelle du tableau de jeu
function getCurrentCol() {
  return parseInt(localStorage.getItem("currentCol")) || 0;
}

// Fonction pour définir la colonne actuelle du tableau de jeu
function setCurrentCol(col) {
  localStorage.setItem("currentCol", col);
}