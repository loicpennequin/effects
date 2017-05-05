function Ball(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(2),random(2));
    this.desire = createVector();
    this.maxSpeed = 5
    this.maxForce = 1.5
    this.history = [];
}

Ball.prototype.update = function(){
    this.history.push(createVector(this.pos.x, this.pos.y))
    if (this.history.length > 200) {
        this.history.splice(0,1)
    }
    this.behaviors();
    this.vel.setMag(this.maxSpeed)
    this.pos.add(this.vel)
}

Ball.prototype.behaviors = function() {
    this.desire = createVector(mouseX, mouseY).sub(this.pos)
    var steer = this.desire.sub(this.vel)
    steer.limit(this.maxForce);
    this.vel.add(steer);

    // if (this.pos.x < 0){
    //     this.vel.x = -this.vel.x * 2
    // }
    // if (this.pos.x > width){
    //     this.vel.x = -this.vel.x * 2
    // }
    // if (this.pos.y < 0){
    //     this.vel.y = -this.vel.y * 2
    // }
    // if (this.pos.y > height){
    //     this.vel.y = -this.vel.y * 2
    // }
}

Ball.prototype.show = function(){
    stroke(255, 50)
    for (let i = 0 ; i < this.history.length ; i ++) {
        fill(map(i,0,this.history.length, 0, 255), 0, 30, 50);

        pos = this.history[i];

        ellipse(pos.x, pos.y, i/2  );
    }
}
