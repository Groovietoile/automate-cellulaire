function initialisationCanvas() {
    this.canvas = document.querySelector("canvas");
    this.tailleCellule = 10;
    this.nbColonnes = document.getElementById("nb_colonnes").value;
    this.nbLignes = document.getElementById("nb_lignes").value;
    this.canvas.width = this.nbColonnes * this.tailleCellule;
    this.canvas.height = this.nbLignes * this.tailleCellule;
    this.cellules = new Array(this.nbLignes);
    for (var i = 0; i < this.cellules; i++) {
        this.cellules[i] = new Array(this.nbColonnes);
    }

    this.regleBinaire = Number(document.getElementById("regle").value).toString(2);
    // règle sur 8 bits
    while (regleBinaire.length < 8) {
        regleBinaire = "0" + regleBinaire;
    }

    this.modeInit = document.querySelector('input[name="mode_init"]:checked').value;
    this.modeExtremite = document.querySelector('input[name="mode_extremite"]:checked').value;

    this.modeInit === "aleatoire" ? initialisationAleatoire() : initialisationSeule();
}

function initialisationAleatoire() {
    for (var i = 0; i < this.nbColonnes; i++) {
        this.cellules[0][i] = Math.floor(Math.random() * 2);
        dessinerCellule(0, i);
    }
    console.log(this.cellules);
}

function initialisationSeule() {
    this.cellules[0][0] = 1;
    dessinerCellule(0, 0);
    for (var i = 1; i < this.nbColonnes; i++) {
        this.cellules[0][i] = 0;
        dessinerCellule(0, i);
    }
}

function dessinerCellule(i, j) {
    const context = this.canvas.getContext('2d');
    context.fillStyle = ["lightblue", "blue"][this.cellules[i][j]];
    context.fillRect(j * this.tailleCellule, i * this.tailleCellule, this.tailleCellule, this.tailleCellule);
}

// voisin de gauche de la cellule précédente
function getVoisinDeGauche(i, j) {
    if (this.modeExtremite === "miroir") {
        // le voisin de gauche de la première cellule a le même état que la première cellule
        return this.cellules[i][j];
    }
    else {
        // le voisin de gauche de la première cellule est la dernière cellule
        return this.cellules[i][this.nbColonnes - 1];
    }
}

// voisin de droite de la cellule précédente
function getVoisinDeDroite(i, j) {
    if (this.modeExtremite === "miroir") {
        // le voisin de droite de la dernière cellule a le même état que la dernière cellule
        return this.cellules[i][j];
    }
    else {
        // le voisin de droite de la dernière cellule est la première cellule
        return this.cellules[i][0];
    }
}

function genererCellule(i, j) {
    var voisinDeGauche = (j - 1 > 0) ? this.cellules[i - 1][j - 1] : getVoisinDeGauche(i - 1, j);
    var voisinDeDroite = (j + 1 < this.nbColonnes) ? this.cellules[i - 1][j + 1] : getVoisinDeDroite(i - 1, j);
    var cellulePrecedente = this.cellules[i - 1][j];

    var cellulePrecedenteEtSesVoisins = `${voisinDeGauche}${cellulePrecedente}${voisinDeDroite}`;
    var kBinaire;
    // vérification de la correspondance pour chaque nombre de 0 à 7 en binaire
    for (var k = 0; k < 8; k++) {
        kBinaire = Number(k).toString(2);
        // k sur 3 bits
        while (kBinaire.length < 3) {
            kBinaire = "0" + kBinaire;
        }
        if (cellulePrecedenteEtSesVoisins === kBinaire) {
            // 111 correspond au caractère à l'indice 0
            return Number(this.regleBinaire.charAt(7 - k));
        }
    }
}

function generer() {
    for (i = 1; i < this.nbLignes; i++) {
        this.cellules[i] = new Array(this.nbColonnes);
        for (j = 0; j < this.nbColonnes; j++) {
            this.cellules[i][j] = genererCellule(i, j);
            dessinerCellule(i, j);
        }
    }
}

function lancerGeneration() {
    //reset canvas
    const canvas = document.querySelector("canvas");
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    initialisationCanvas();

    generer();
}