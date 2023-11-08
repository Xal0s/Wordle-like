import {allWords} from './words.js';
const listeDeMots = allWords();
console.log(listeDeMots);
let chaine = "";
let chaine2 = "";
let index = 0;
let caractere = "";
let propositionTemp = "";
let resultatTemp = "";
let lettreTemp = "";
let numeroProposition = 0;
let positionChaine = 0;
let indexClavier = 0;
let clavierTemp = "AZERTYUIOPQSDFGHJKLMWXCVBN";
let clavier = [];
for (let cpt = 0; cpt < clavierTemp.length; cpt++) { // FONCTIONNE créée une première grille clavier avec 'b' comme blanc pour les touches
    clavier[cpt] = [clavierTemp[cpt], 'b'];
};
// let listeDeMots = ['aafff', 'bbbbb', 'ccdcc', 'ddedd', 'eefee', 'fafff'];
shuffle(listeDeMots); // on mélange la listeDeMots

let tirerAuSort = listeDeMots; // TirerAuSort est la liste de mots mélangés qui sert de réserve de mots pour les parties successives.
let grilles = [];
let solution = tirerAuSort.pop(); // 'solution' prend la valeur du mot qui est à deviner. On le retire des mots pris dans les parties futures.
console.log(solution);

let numeroTentative = 0
let existeDansDictionnaire = false;
// #######################################################################################################
function shuffle(listeDeMots) {
    listeDeMots.sort(() => Math.random() - 0.5);
};

function testDictionnaire(proposition) { // FONCTIONNE teste si le mot choisi par l'utilisateur vient de rentrer une proposition 
    if (listeDeMots.includes(proposition)) {
        existeDansDictionnaire = true;
        console.log(existeDansDictionnaire);
    } else {
        existeDansDictionnaire = false;
        console.log(existeDansDictionnaire);
    }
    return existeDansDictionnaire;
};

function analyseProposition(propositon) { // FONCTIONNE on calcule une chaine de caractères 'couleur' qui reprend 
    let couleur = "ggggg";
    for (let cpt = 0; cpt < 5; cpt++) {
        for (let cpt2 = 0; cpt2 < 5; cpt2++) {
            if (proposition[cpt] == solution[cpt]) {
                chaine = remplacerChaine(couleur, cpt, 'v');
                couleur = chaine;
                cpt2 = 5;
            } else {
                if (proposition[cpt] == solution[cpt2]) {
                    chaine = remplacerChaine(couleur, cpt, 'j');
                    couleur = chaine;
                    cpt2 = 5;
                };

            };
        };
    };
    grilles.push([proposition, couleur]);
    console.log(grilles);
};

function remplacerChaine(chaine, index, caractere) { // FONCTIONNE on remplace dans la chaine le caractère placé à un index donné par le caractère passé à la fonction
    switch (index) {
        case 0:
            chaine2 = caractere + chaine.substring(index + 1);
        case 4:
            chaine2 = chaine.substring(0, index) + caractere;
        default:
            chaine2 = chaine.substring(0, index) + caractere + chaine.substring(index + 1);
    };
    chaine = chaine2;
    return chaine;
};

function modifierClavier(grilles) {
    for (indexClavier = 0 ; indexClavier < clavier.length ; indexClavier++) {
        for (numeroProposition = 0; numeroProposition < grilles.length; numeroProposition++) {
            resultatTemp = grilles[numeroProposition][1];
            propositionTemp = grilles[numeroProposition][0];
            for (positionChaine = 0; positionChaine < 5; positionChaine++) {
                lettreTemp = propositionTemp[positionChaine];
                switch (resultatTemp[positionChaine]) {
                    case 'v':
                        ecritureClavier(lettreTemp, 'v');
                    case 'j':
                        ecritureClavier(lettreTemp, 'j');
                };
            };
        };
    };
    return clavier;
};

function ecritureClavier(lettreTemp, caractere){
    for (let indexClavier2 = 0 ; indexClavier2 < clavier.length ; indexClavier2++) {
        if (clavier[indexClavier2][0] == lettreTemp){
            if (caractere == 'v'){
                clavier[indexClavier2][1] = 'v';
            } else if(caractere == 'j' && clavier[indexClavier2][1] != 'v'){
                clavier[indexClavier2][1] = 'j';
            };
        };
    }; 
};

// ######################################################################################################
let proposition = "OVFFF"; // on indique une proposition de l'utilisateur pour les tests
testDictionnaire(proposition);
console.log(existeDansDictionnaire);
analyseProposition(proposition);
modifierClavier(grilles);


proposition = "DDAAE"; // on indique une proposition de l'utilisateur pour les tests
numeroTentative++
testDictionnaire(proposition);
console.log(existeDansDictionnaire);
analyseProposition(proposition);
modifierClavier(grilles);

proposition = "CCAAC"; // on indique une proposition de l'utilisateur pour les tests
numeroTentative++
testDictionnaire(proposition);
console.log(existeDansDictionnaire);
analyseProposition(proposition);
console.log(`grilles : ${grilles}`);
modifierClavier(grilles);
console.log(clavier);
console.log(clavier.length);
