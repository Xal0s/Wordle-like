function shuffle(listeDeMots) {
    listeDeMots.sort(() => Math.random() - 0.5);
};

let chaine = "";
let chaine2 = "";
let index = 0;
let caractere = "";

let listeDeMots = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee', 'fffff'];
shuffle(listeDeMots); // on mélange la listeDeMots
console.log(listeDeMots);

let tirerAuSort = listeDeMots; // TirerAuSort est la liste de mots mélangés qui sert de réserve de mots pour les parties successives.
console.log(`tirer au sort : ${tirerAuSort} `);

let grilles = [];
let solution = tirerAuSort.pop(); // 'solution' prend la valeur du mot qui est à deviner. On le retire des mots pris dans les parties futures.
console.log(`solution : ${solution}`);

console.log(tirerAuSort);

let proposition = "fabcf"; // on indique une proposition de l'utilisateur pour les tests
console.log(proposition);
let numeroTentative = 0
let existeDansDictionnaire = false;

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
        console.log(`cpt=:${cpt}`);

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
    console.log(chaine);
    console.log(`couleur : ${couleur}`);
    grilles.unshift([numeroTentative, proposition, couleur]);
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

testDictionnaire(proposition);
console.log(existeDansDictionnaire);
analyseProposition(proposition);
