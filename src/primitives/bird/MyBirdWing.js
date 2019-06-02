import MyQuad from "../MyQuad.js";
import Utils from "../../Utils.js";
import MyTriangleSmall from "../MyTriangleSmall.js";
import {IMAGE_PATH} from "../../Configuration.js";

const MAX_ORIENTATION = 45.0; // degrees
const PERIOD = 1000;

class MyBirdWing {
    constructor(scene) {
        this.scene = scene;
        this.wingBody = new MyWingBody(scene, 60);
        this.wingTip = new MyWingTip(scene, 60);
        this.elapsedTime = 0;
        this.maxOrientation = Utils.degToRad(45);
        this.speedFactor = 1;
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0.3, 0.3, 0.3, 1);
        this.material.loadTexture(IMAGE_PATH + '/bird-body-texture.jpg');
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        {
            let angle = this.getOrientation(this.elapsedTime);
            this.scene.rotate(angle, 1, 0, 0);
            this.wingBody.display();
            this.scene.translate(0, 0, -1);
            this.wingTip.display();
        }
        this.scene.popMatrix();
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
        this.wingTip.update(deltaTime);
    }

    getOrientation(time) {
        let y = Utils.sinCurve(1, PERIOD / this.speedFactor, time);
        return this.maxOrientation * y;
    }

    setSpeedFactor(value) {
        this.speedFactor = value;
        this.wingBody.setSpeedFactor(value);
        this.wingTip.setSpeedFactor(value);
    }
}

class MyWingBody extends CGFobject {
    constructor(scene, maxOrientation = MAX_ORIENTATION) {
        super(scene);
        this.maxOrientation = Utils.degToRad(maxOrientation);
        this.wingBody = new MyQuad(scene);
        this.elapsedTime = 0;
        this.currentOrientation = 0;
        this.speedFactor = 1;
    }

    display() {
        this.scene.pushMatrix();
        {
            let angle = this.getOrientation(this.elapsedTime);
            this.currentOrientation = angle;
            this.scene.rotate(angle, 1, 0, 0);
            this.scene.translate(0, 0, -0.5);
            this.displayWingBody();
        }
        this.scene.popMatrix();
    }

    getOrientation(time) {
        let y = Utils.sinCurve(1, PERIOD / this.speedFactor, time);
        return this.maxOrientation * y;
    }

    displayWingBody() {
        this.displayWingBodyTopFace();
        this.displayWingBodyBottomFace();
    }

    displayWingBodyTopFace() {
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);
            this.scene.rotate(angle, 1, 0, 0);
            this.wingBody.display();
        }
        this.scene.popMatrix();
    }

    displayWingBodyBottomFace() {
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);
            this.scene.rotate(angle, 1, 0, 0);
            this.wingBody.display();
        }
        this.scene.popMatrix();
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
    }

    setSpeedFactor(value) {
        this.speedFactor = value;
    }
}

class MyWingTip extends CGFobject {
    constructor(scene, maxOrientation = MAX_ORIENTATION) {
        super(scene);
        this.maxOrientation = Utils.degToRad(maxOrientation);
        this.wingTip = new MyTriangleSmall(scene);
        this.elapsedTime = 0;
        this.speedFactor = 1;
    }

    display() {
        this.scene.pushMatrix();
        {
            let angle = this.getOrientation(this.elapsedTime);
            //this.scene.translate(0, 0, 1);
            this.scene.rotate(angle, 1, 0, 0);
            this.displayWingTip();
        }
        this.scene.popMatrix();
    }

    displayWingTip() {
        this.displayWingTipTopFace();
        this.displayWingTipBottomFace();
    }

    displayWingTipTopFace() {
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);
            this.scene.rotate(angle, 1, 0, 0);
            this.wingTip.display();
        }
        this.scene.popMatrix();
    }

    displayWingTipBottomFace() {
        this.scene.pushMatrix();
        {
            let alpha = Utils.degToRad(-90);
            let beta = Utils.degToRad(180);
            this.scene.rotate(alpha, 1, 0, 0);
            this.scene.rotate(beta, 0, 1, 0);
            this.wingTip.display();
        }
        this.scene.popMatrix();
    }

    getOrientation(time) {
        let y = Utils.sinCurve(1, PERIOD / this.speedFactor, time);
        return this.maxOrientation * y;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
    }

    setSpeedFactor(value) {
        this.speedFactor = value;
    }
}

export default MyBirdWing;