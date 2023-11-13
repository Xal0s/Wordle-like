const launchGame = document.getElementsByClassName("new_game")
const gameModes = document.getElementsByClassName("game_modes")
const toggle = document.querySelector(".toggle")
const chrono = document.querySelector(".etat_toggle")
function displayRules(){
    document.getElementById("modal_rules").style.left = "680px";
}

function hideRules(){
    document.getElementById("modal_rules").style.left = "-500vh";
}

function displayGameModes(){
    document.getElementById("menu_game_mode").style.left = "0px";
}

function hideGameModes(){
    document.getElementById("menu_game_mode").style.left = "-500vh";
}


function sliderToggle(){
    toggle.classList.toggle("active");
    
    if(toggle.classList.contains("active")){
        chrono.innerHTML = "Chrono ON";
        document.getElementById("toggle_button").style.left = "47px";
    }
    else{
        chrono.innerHTML = "Chrono OFF"
        document.getElementById("toggle_button").style.left = "4px";
    }
}
