import {MyUnitCubeQuad} from "../primitives/MyUnitCubeQuad.js";
import MyTriangleSmall from "../primitives/MyTriangleSmall.js";
import Utils from "../Utils.js";

class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyUnitCubeQuad(scene);
        this.wing = new MyTriangleSmall(scene);
    }

    display() {
        this.displayBody();
        this.displayWings();
    }

    displayBody() {
        this.body.display();
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

    update(t) {
        
    }
}

export default MyBird;