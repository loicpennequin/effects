function Planet(x,y, speed, force){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.maxSpeed = speed;
    this.maxForce = force;
    this.history = [];
}

Planet.prototype.update = function(dx, dy){
    //On crée un vecteur target vers l'endroit où le satellite souhaite se rendre
    var target = createVector(dx, dy)
    //On crée un vecteur de la "velocité desirée" en soustrayant le vecteur position à target
    var desire = target.sub(this.pos);
    //La force de direction est calculée en soustrayant la vélocité actuelle au désir
    var steer = desire.sub(this.vel);
    //On limite la puissance de la force de direction
    steer.limit(this.maxForce);
    //On ajoute la force de direction à la vélocité actuelle
    this.vel.add(steer);
    //On règle la magnitude du vecteur de véolcité, et donc sa vitesse
    this.vel.setMag(this.maxSpeed);
    //on ajoute le vecteur de vélocité  au vecteur de position
    this.pos.add(this.vel);
}

Planet.prototype.trail = function(){
    //On rajoute à l'historique un couple de points x,y égaux à la position actuelle
    this.history.push(createVector(this.pos.x, this.pos.y));
    //Si l'historique possède plus de 30 positions, on supprime la plus ancienne
    if (this.history.length > 30){
        this.history.splice(0,1);
    }
}

Planet.prototype.show = function(){
    noStroke();
    strokeWeight(1);
    //On affiche chaque élément de l'historique, de plus en  plus petit
    for (let i = 0; i < this.history.length ; i++) {
        let pos = this.history[i];
        let distance = dist(mouseX, mouseY, pos.x, pos.y);
        let glow = map(distance, 0, 300, 155, 0);
        let hue = map(i, 0, this.history.length, 0, 255)
        fill(255, hue, hue, glow);
        ellipse(pos.x, pos.y, map(i, 0, this.history.length, 1, 15))
    }
}
