function getRandomSize() {
    let r = randomGaussian() * 2.5;
    return constrain(abs(r * r), 2, 8);
    // while (true) {
    //     var r1 = random(1);
    //     var r2 = random(2);
    //     if (r2 > r1) {
    //         return r1 * 8;
    //     }
    // }
}


class Snowflake {

    constructor(sa, sb) {
        let a = sa || random(width);
        let b = sb || random(-100, -10);

        this.pos = createVector(a, b);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.angle = random(TWO_PI);
        this.r = getRandomSize();
    }

    applyForce(force) {
        var f = force.copy();
        f.mult(this.r);
        this.acc.add(force);
    }

    randomize() {
        let a = random(width);
        let b = random(-100, -10);

        this.pos = createVector(a, b);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.r = getRandomSize();

    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.2); //vector function limiting length

        if (this.vel.mag() < 1) {
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.y > height + this.r) {
            this.randomize();
        }
    }

    render() {

        // rotate(this.angle);
        stroke(255);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    }

    // offScreen() {
    //     return (this.pos.y > height + this.r);
    // }


}

