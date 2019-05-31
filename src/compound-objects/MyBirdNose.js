import MyPyramid from "../primitives/MyPyramid.js";
import {IMAGE_PATH} from "../Configuration.js";

class MyBirdNose extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nose = new MyPyramid(scene);
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0.3, 0.3, 0.3, 1);
        this.material.loadTexture(IMAGE_PATH + '/bird-nose-texture.jpg');
    }

    display() {
        this.material.apply();
        this.nose.display();
    }
}

export default MyBirdNose;