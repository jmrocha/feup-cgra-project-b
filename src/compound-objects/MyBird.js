import MyUnitCubeQuad from "../primitives/MyUnitCubeQuad.js";
import MyTriangleSmall from "../primitives/MyTriangleSmall.js";
import Utils from "../Utils.js";
import MyPyramid from "../primitives/MyPyramid.js";

class MyBird extends CGFobject {
    constructor(scene, orientation = 0, velocity = 0, position = [0, 0, 0]) {
        super(scene);
        this.defaultValues = {
            position: [...position],
            velocity: velocity,
            orientation: orientation
        };
        this.position = position;
        this.flutterPosition = [0, 0, 0];
        this.orientation = Utils.degToRad(orientation);
        this.velocity = velocity;
        this.elapsedTime = 0;
        scene.addObserver(this);
        this.scaleFactor = 1;
        this.flutterVelocity = 1;
        this.state = 'flying';
        this.body = new MyUnitCubeQuad(scene);
        this.wing = new MyTriangleSmall(scene);
        this.nose = new MyPyramid(scene);
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.scene.translate(...this.position);
            this.scene.rotate(-this.orientation, 0, 1, 0);
            this.flap();
            this.displayHead();
            this.displayWings();
        }
        this.scene.popMatrix();
    }

    flap() {
        this.scene.translate(0, this.flutterPosition[1], 0);
    }

    displayNose() {
        this.scene.pushMatrix();
        {
            let scaleFactor = 0.5;
            let angle = Utils.degToRad(-90);
            this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
            this.scene.translate(0.3, 0, 0);
            this.scene.rotate(angle, 0, 0, 1);
            this.nose.display();
        }
        this.scene.popMatrix();
    }

    displayHead() {
        this.scene.pushMatrix();
        {
            this.body.display();
            this.displayNose();
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

        if (this.state === 'flying-down')
            this.goDown();
        else if (this.state === 'flying-up')
            this.goUp();
    }

    updateDisplacement() {
        this.position[0] += this.velocity * this.deltaTime * Math.cos(this.orientation);
        this.flutterPosition[1] += this.getFlapYDisplacement(this.elapsedTime);
        this.position[2] += this.velocity * this.deltaTime * Math.sin(this.orientation);
    }

    goDown() {
        let distance = this.defaultValues['position'][1];
        let velocity = distance / 1000;
        let displacement = velocity * this.deltaTime;
        let dx = this.position[1] - displacement;

        if (dx > 0)
            this.position[1] -= displacement;
        else {
            this.position[1] = 0;
            this.state = 'flying-up';
        }
    }

    goUp() {
        let distance = this.defaultValues['position'][1];
        let velocity = distance / 1000;
        let displacement = velocity * this.deltaTime;
        let dx = this.position[1] + displacement;

        if (dx < this.defaultValues['position'][1])
            this.position[1] += displacement;
        else {
            this.position[1] = this.defaultValues['position'][1];
            this.state = 'flying';
        }
    }

    getFlapYDisplacement(t) {
        let amplitude = 0.01;
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
        this.velocity = this.defaultValues['velocity'];
        this.position = [...this.defaultValues['position']];
        this.orientation = this.defaultValues['orientation'];
        this.state = 'flying';
    }

    takeBough() {
        if (this.state === 'flying') {
            this.state = 'flying-down';
        } else if (this.state === 'ground') {
            this.state = 'flying-up'
        }
    }

    setFlutterVelocity(value) {
        this.flutterVelocity = value;
    }
}

export default MyBird;