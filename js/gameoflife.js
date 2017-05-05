var satellites = [];
var font;
var message = "LoïcPennequin".split('');
var letters = {};

function preload() {
    font = loadFont('ArchitectsDaughter.ttf');
    img = loadImage("header-bg.png");
}

function setup(){
    strokeCap(ROUND);
    var myCanvas = createCanvas(windowWidth,300);
    myCanvas.parent('header')

    //Creation des satellites (x, y, vitesse max, force de direction max)
    for (let i = 0 ; i < 20 ; i++){
        satellites.push(new Planet(random(width), random(height), random(4,6), random(0.4, 1)))
    }

    //Conversion de chaque lettre du  message en array de points, puis création d'objets Particle aux coordonnées de ces points et transmis à l'objet letters
    message.forEach(function(value, index){
        var points =font.textToPoints(value , (index*75)+windowWidth*0.1, 175, 120)
        var particles = [];
        points.forEach(function(value, ptIndex){
            particles.push(new Particle(points[ptIndex].x, points[ptIndex].y) );
        })
        letters['letter' + index] = particles;
    });
}

function draw(){
    clear();
    stroke(255);
    image(img,0,0)

    //Gestion des satellites
    for (let i = 0; i < satellites.length ; i++){
        let sat = satellites[i];
        sat.update(mouseX, mouseY);
        sat.trail();
        sat.show();
    }

    //Gestion de l'affichage des lettres
    for (var letter in letters) {
        if (letters.hasOwnProperty(letter)) {
            for (let i = 0 ; i < letters[letter].length-1 ; i++ ){
                let pointDisplay = letters[letter][i];
                let nextPoint = letters[letter][i+1];
                pointDisplay.show(nextPoint.pos.x, nextPoint.pos.y);
            }
        }
    }
}
