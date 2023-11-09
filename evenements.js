import * as grilles from "/grilles.js";

// import entreeNouvelleProposition from "grilles.js";

const clickEnter = () => {
    let proposition = document.getElementById("domTextElement").value;
    document.getElementById("valueInput").innerHTML = proposition;
    console.log(proposition);
    grilles.entreeNouvelleProposition(proposition);
};
