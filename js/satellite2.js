function Satellite(x,y){
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.desire = createVector();
    this.maxSpeed = 10
    this.maxForce = 0.5;
}

Satellite.prototype.update = function(){
    this.desire = createVector(ball.pos.x, ball.pos.y).sub(this.pos);
    var steer = this.desire.sub(this.vel);
    this.vel.add(steer);
    steer.limit(this.maxForce);
    this.vel.setMag(this.maxSpeed)
    this.pos.add(this.vel);
}

Satellite.prototype.show = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 10);
}
