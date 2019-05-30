import MyUnitCubeQuad from "./MyUnitCubeQuad.js";
import MyTriangleSmall from "../primitives/MyTriangleSmall.js";
import Utils from "../Utils.js";
import MyPyramid from "../primitives/MyPyramid.js";
import MyTreeBranch from "./MyTreeBranch.js";
import MyWing from "./MyWing.js";
import MyBirdEye from "./MyBirdEye.js";
import MyBirdNose from "./MyBirdNose.js";
import MyBirdTail from "./MyBirdTail.js";

const TIME_TO_PICK_BOUGH = 400; // time in ms

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
        this.scaleFactor = 1;
        this.state = 'flying';
        this.head = new MyUnitCubeQuad(scene);
        this.body = new MyUnitCubeQuad(scene);
        this.wing = new MyWing(scene);
        this.nose = new MyBirdNose(scene);
        this.tail = new MyBirdTail(scene);
        this.bough = null;
        this.speedFactor = 1;
        this.eye = new MyBirdEye(scene);

        // register to receive scene updates
        scene.addObserver(this);
    }

    displayBough() {
        this.bough.display();
    }

    display() {
        this.displayBird();
        // if bird has a bough, display it
        if (this.bough)
            this.displayBough();
    }

    displayBird() {
        this.scene.pushMatrix();
        {
            this.positionBird();
            this.flap();
            this.displayHead();
            this.displayBody();
            this.displayWings();
            this.displayTail();
        }
        this.scene.popMatrix();
    }

    displayTail() {
        this.scene.pushMatrix();
        {
            this.scene.translate(-1, -0.5, 0);
            this.scene.scale(0.8, 0.8, 0.8);
            this.tail.display();
        }
        this.scene.popMatrix();
    }

    /**
     * Make transformations to position the bird, taking into account the following variables:
     *  - scale
     *  - position
     *  - orientation
     */
    positionBird() {
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.translate(...this.position);
        this.scene.rotate(-this.orientation, 0, 1, 0);
    }

    displayBody() {
        this.scene.pushMatrix();
        {
            this.scene.translate(-0.5, -0.5, 0);
            this.body.display();
        }
        this.scene.popMatrix();
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
            this.scene.translate(0, 0.5, 0);
            this.head.display();
            this.displayEyes();
            this.displayNose();
        }
        this.scene.popMatrix();
    }

    displayEyes() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0.3, 0, 0);
            this.displayLeftEye();
            this.displayRightEye();
        }
        this.scene.popMatrix();
    }

    displayLeftEye() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0.1, 0.5);
            this.scene.scale(0.2, 0.2, 0.2);
            this.eye.display();
        }
        this.scene.popMatrix();
    }

    displayRightEye() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0.1, -0.5);
            this.scene.scale(0.2, 0.2, 0.2);
            this.eye.display();
        }
        this.scene.popMatrix();
    }

    displayWings() {
        this.scene.pushMatrix();
        {
            //this.scene.scale(0.7, 0.7, 0.7);
            this.displayWingLeft();
            this.displayWingRight();
        }
        this.scene.popMatrix();
    }

    displayWingLeft() {
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(180);
            this.scene.translate(0, 0, 0.5);
            this.scene.rotate(angle, 0, 1, 0);
            this.wing.display();
        }
        this.scene.popMatrix();
    }

    displayWingRight() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0, -0.5);
            this.wing.display();
        }
        this.scene.popMatrix();
    }

    update(deltaTime) {
        this.wing.update(deltaTime);
        this.deltaTime = deltaTime;
        this.elapsedTime += deltaTime;

        this.updateDisplacement();

        if (this.state === 'flying-down')
            this.goDown();
        else if (this.state === 'flying-up')
            this.goUp();

        if (this.bough) {
            this.bough.position = [...this.position];
            this.bough.position[1] += this.flutterPosition[1];
        }
    }

    updateDisplacement() {
        this.position[0] += this.velocity * this.deltaTime * Math.cos(this.orientation);
        this.flutterPosition[1] += this.getFlapYDisplacement(this.elapsedTime);
        this.position[2] += this.velocity * this.deltaTime * Math.sin(this.orientation);
    }

    /**
     * Applies a translation in the 'y' axis to make the bird flap. This function uses the flutterPosition variable.
     */
    flap() {
        this.scene.translate(0, this.flutterPosition[1], 0);
    }

    goDown() {
        let distance = this.defaultValues['position'][1];
        let velocity = distance / TIME_TO_PICK_BOUGH;
        let displacement = velocity * this.deltaTime;
        let dx = this.position[1] - displacement;

        if (dx > 0) {
            this.position[1] -= displacement;
        }
        else {
            this.position[1] = 0;
            this.setState('flying-up');
        }
    }

    goUp() {
        let distance = this.defaultValues['position'][1];
        let velocity = distance / TIME_TO_PICK_BOUGH;
        let displacement = velocity * this.deltaTime;
        let dx = this.position[1] + displacement;

        if (dx < this.defaultValues['position'][1])
            this.position[1] += displacement;
        else {
            this.position[1] = this.defaultValues['position'][1];
            this.setState('flying');
        }
    }

    /**
     * Sets the state of the bird and notifies the scene about it.
     * @param state - the state of the bird
     */
    setState(state) {
        switch (state) {
            case 'flying':
                if (this.state !== 'flying')
                    this.scene.flying();
                break;
            case 'flying-up':
                if (this.state !== 'flying-up')
                    this.scene.flyingUp();
                break;
            case 'flying-down':
                if (this.state !== 'flying-down')
                    this.scene.flyingDown();
                break;
            default:
                break;
        }

        this.state = state;
    }

    getFlapYDisplacement(t) {
        let amplitude = 0.01;
        let f = 1 / 1000;
        let angle = 2 * Math.PI * f * t;
        return amplitude * Math.sin(angle);
    }

    turn(degrees) {
        this.orientation += Utils.degToRad(degrees) * this.speedFactor;
    }

    accelerate(velocity) {
        this.velocity += velocity * this.speedFactor;
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
            this.setState('flying-down');
        } else if (this.state === 'ground') {
            this.setState('flying-up');
        }
    }

    pickBough(bough) {
        this.bough = bough;
    }

    dropBough() {
        this.bough.pickable = false;
        this.scene.addBough(this.bough);
        this.bough = null;
    }

    setSpeedFactor(value) {
        this.speedFactor = value;
        this.wing.setSpeedFactor(value);
    }
}

export default MyBird;