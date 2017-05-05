function Particle(x,y){
    this.pos = createVector(x,y);
}

Particle.prototype.show = function(dx, dy){
    distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    //plus la particule est proche du curseur, plus elle est blanche et opaque
    glow = map(distance, 0, 600, 255, 0);
    noFill();
    strokeWeight(5);
    stroke(255, glow, glow,  glow );
    line(this.pos.x, this.pos.y, dx, dy)
    // ellipse(this.pos.x, this.pos.y, 5)
}
