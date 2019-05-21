import MyUnitCubeQuad from "../primitives/MyUnitCubeQuad.js";
import MyTriangleSmall from "../primitives/MyTriangleSmall.js";
import Utils from "../Utils.js";

class MyBird extends CGFobject {
    constructor(scene, orientation = 'y', velocity = 0, position = [0, 0, 0]) {
        super(scene);
        this.orientation = orientation;
        this.velocity = velocity;
        this.position = position;
        this.body = new MyUnitCubeQuad(scene);
        this.wing = new MyTriangleSmall(scene);
        this.elapsedTime = 0;
        this.flapYDisplacement = 0;
    }

    display() {
        this.scene.pushMatrix();
        {
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
        this.elapsedTime += deltaTime;
        this.updateDisplacement();
    }

    updateDisplacement() {
        this.flapYDisplacement += this.getFlapYDisplacement(this.elapsedTime);
    }

    getFlapYDisplacement(t) {
        let amplitude = 0.02;
        let f = 1 / 1000;
        let angle = 2 * Math.PI * f * t;
        return amplitude * Math.sin(angle);
    }

    turn(velocity) {

    }

    accelerate(velocity) {

    }
}

export default MyBird;