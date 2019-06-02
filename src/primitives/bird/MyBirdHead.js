import MyCylinder from "../MyCylinder.js";
import {IMAGE_PATH} from "../../Configuration.js";

class MyBirdHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.eye = new MyCylinder(scene, 3);
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0.3, 0.3, 0.3, 1);
        this.material.loadTexture(IMAGE_PATH + '/bird-head-texture.jpg');
    }

    display() {
        this.material.apply();
        this.eye.display();
    }
}

export default MyBirdHead;