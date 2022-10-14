function initialisationCanvas(){
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
    // const zeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));
    // this.cellules = zeros(this.nbLignes, this.nbColonnes);
    // zeros();
    this.modeInit = document.querySelector('input[name="mode_init"]:checked').value;
    this.modeExtremite = document.querySelector('input[name="mode_extremite"]:checked').value;

    this.modeInit === "aleatoire" ? initialisationAleatoire() : initialisationSeule();
}

// function zeros(){
//     // for (var i = 0; i < this.nbLignes; i++) {
//     //     for (var j = 0; j < this.nbColonnes; j++) {
//     //         this.cellules[i][j] = 0;
//     //     }
//     // }
//     var array = [];

//     for (var i = 0; i < this.cellules[0]; ++i) {
//         array.push(this.cellules.length == 1 ? 0 : zeros(this.cellules.slice(1)));
//     }
// }

function initialisationAleatoire() {
    for (var i = 0 ; i < this.nbColonnes ; i++) {
        this.cellules[0][i] = Math.floor(Math.random() * 2);
        dessiner(0,i);
    }
    console.log(this.cellules);
}

function initialisationSeule(){
    this.cellules[0][0] = 1;
    dessiner(0,0);
    for (var i = 1 ; i < this.nbColonnes ; i++) {
        this.cellules[0][i] = 0;
        dessiner(0,i);
    }
}

// function dessiner(){
//     const context = this.canvas.getContext('2d');
//     loop1:
//         for (i = 0; i < this.cellules.length; i++) {
//             for (j = 0; j < this.cellules[0].length; j++) {
//                 if(this.cellules[i][j] !== 0 && this.cellules[i][j] !== 1){
//                     break loop1;
//                 }
//                 context.fillStyle = ["lightblue", "blue"][this.cellules[i][j]];
//                 context.fillRect(j * this.tailleCellule, i * this.tailleCellule, this.tailleCellule, this.tailleCellule);
//             }
//         }
// }

function dessiner(i,j){
    const context = this.canvas.getContext('2d');
    context.fillStyle = ["lightblue", "blue"][this.cellules[i][j]];
    context.fillRect(j * this.tailleCellule, i * this.tailleCellule, this.tailleCellule, this.tailleCellule);
}

// voisin de gauche de la cellule précédente
function getVoisinDeGauche(i, j){
    if(this.modeExtremite === "miroir"){
        // le voisin de gauche de la première cellule a le même état que la première cellule
        return this.cellules[i][j];
    }
    else{
        // le voisin de gauche de la première cellule est la dernière cellule
        return this.cellules[i][this.nbColonnes-1];
    }
}

// voisin de droite de la cellule précédente
function getVoisinDeDroite(i, j){
    if(this.modeExtremite === "miroir"){
        // le voisin de droite de la dernière cellule a le même état que la dernière cellule
        return this.cellules[i][j];
    }
    else{
        // le voisin de droite de la dernière cellule est la première cellule
        return this.cellules[i][0];
    }
}

function genererCellule(i, j){
    var voisinDeGauche = (j-1 > 0) ? this.cellules[i-1][j-1] : getVoisinDeGauche(i-1, j);
    var voisinDeDroite = (j+1 < this.nbColonnes) ? this.cellules[i-1][j+1] : getVoisinDeDroite(i-1, j);   
    var cellulePrecedente = this.cellules[i-1][j];

    // if (([voisinDeGauche, cellulePrecedente, voisinDeDroite] = [1,1,1]) ||
    //     ([voisinDeGauche, cellulePrecedente, voisinDeDroite] = [1,0,0]) ||
    //     ([voisinDeGauche, cellulePrecedente, voisinDeDroite] = [0,0,0])){
    //         return 0;
    //     }

    // 7 ou 4 ou 0
    if((voisinDeGauche === 1 && cellulePrecedente === 1 && voisinDeDroite === 1) ||
        (voisinDeGauche === 1 && cellulePrecedente === 0 && voisinDeDroite === 0) ||
        (voisinDeGauche === 0 && cellulePrecedente === 0 && voisinDeDroite === 0)) {
        return 0;
    }

    return 1;
}

function generer() {
    for (i = 1; i < this.nbLignes; i++) {
        this.cellules[i] = new Array(this.nbColonnes);
        for (j = 0; j < this.nbColonnes; j++) {
            // console.log("i : " + i + ", j : " + j);
            this.cellules[i][j] = genererCellule(i,j);
            dessiner(i,j);
        }
    }
}

function lancerGeneration(){
    //reset canvas
    const canvas = document.querySelector("canvas");
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    initialisationCanvas();

    generer();
}