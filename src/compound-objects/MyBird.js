import MyUnitCubeQuad from "../primitives/MyUnitCubeQuad.js";
import MyTriangleSmall from "../primitives/MyTriangleSmall.js";
import Utils from "../Utils.js";

class MyBird extends CGFobject {
    constructor(scene, orientation = 0, velocity = 0, position = [0, 0, 0]) {
        super(scene);
        this.orientation = Utils.degToRad(orientation);
        this.velocity = velocity;
        this.position = position;
        this.body = new MyUnitCubeQuad(scene);
        this.wing = new MyTriangleSmall(scene);
        this.elapsedTime = 0;
        this.flapYDisplacement = 0;
        scene.addObserver(this);
        this.scaleFactor = 1;
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.scene.translate(...this.position);
            this.scene.rotate(this.orientation, 0, 1, 0);
            this.flap();
            this.displayBody();
            this.displayWings();
        }
        this.scene.popMatrix();
    }

    flap() {
        this.scene.translate(0, this.flapYDisplacement, 0);
    }

    displayBody() {
        this.scene.pushMatrix();
        {
            this.body.display();
        }
        this.scene.popMatrix();
    }

    displayWings() {
        this.displayWingLeft();
        this.displayWingRight();
    }

    displayWingLeft() {
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);
            this.scene.rotate(angle, 1, 0, 0);
            this.scene.rotate(angle, 0, 0, 1);
            this.wing.display();
        }
        this.scene.popMatrix();
    }

    displayWingRight() {
        this.scene.pushMatrix();
        {
            let alpha = Utils.degToRad(90);
            let beta = Utils.degToRad(-90);
            this.scene.rotate(alpha, 1, 0, 0);
            this.scene.rotate(beta, 0, 0, 1);
            this.wing.display();
        }
        this.scene.popMatrix();
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.elapsedTime += deltaTime;
        this.updateDisplacement();
    }

    updateDisplacement() {
        this.flapYDisplacement += this.getFlapYDisplacement(this.elapsedTime);
        this.position[0] += this.velocity * this.deltaTime * Math.cos(this.orientation);
        this.position[2] += this.velocity * this.deltaTime * Math.sin(this.orientation);
    }

    getFlapYDisplacement(t) {
        let amplitude = 0.02;
        let f = 1 / 1000;
        let angle = 2 * Math.PI * f * t;
        return amplitude * Math.sin(angle);
    }

    turn(degrees) {
        this.orientation += Utils.degToRad(degrees);
    }

    accelerate(velocity) {
        this.velocity += velocity;
        if (this.velocity < 0) this.velocity = 0;
    }

    scale(value) {
        this.scaleFactor = value;
    }

    reset() {
        this.velocity = 0;
        this.position = [0, 0, 0];
        this.orientation = 0;
    }
}

export default MyBird;