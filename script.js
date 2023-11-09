const launchGame = document.getElementsByClassName("new_game")
const gameModes = document.getElementsByClassName("game_modes")
const toggle = document.querySelector(".toggle")
const chrono = document.querySelector(".etat_toggle")
let timerActive = localStorage.getItem('timerActive') === 'true';
function displayRules(){
    document.getElementById("modal_rules").style.left = "530px";
}

function hideRules(){
    document.getElementById("modal_rules").style.left = "-500px";
}

function displayGameModes(){
    document.getElementById("menu_game_mode").style.left = "0px";
}

function hideGameModes(){
    document.getElementById("menu_game_mode").style.left = "-500vh";
}

function activeTimer(){
    console.log("active")
    localStorage.setItem('timerActive', 'true');
            
    window.location.href = 'jeu.html';
}

function sliderToggle(){
    toggle.classList.toggle("active");
    
    if(toggle.classList.contains("active")){
        chrono.innerHTML = "Chrono ON";
        activeTimer();
    }
    else{
        chrono.innerHTML = "Chrono OFF"
    }
}


if (timerActive) {
    // Commencer le timer si activé
    var startTime = new Date().getTime();

    setInterval(function () {
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - startTime;

        // Mettre à jour l'affichage du timer
        document.getElementById('timer').innerText = 'Temps écoulé : ' + (elapsedTime / 1000) + ' secondes';
    }, 100000);
}