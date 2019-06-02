import MyPyramid from "../MyPyramid.js";
import {IMAGE_PATH} from "../../Configuration.js";

class MyBirdTail {
    constructor(scene) {
        this.scene = scene;
        this.tail = new MyPyramid(scene);
        this.material = new CGFappearance(scene);
        let texture = new CGFtexture(scene, IMAGE_PATH + '/bird-body-texture.jpg');
        this.material.setTexture(texture);
    }

    display() {
        this.material.apply();

        this.scene.pushMatrix();
        {
            this.scene.scale(0.4, 0.4, 0.5);
            this.tail.display();
        }
        this.scene.popMatrix();
    }
}

export default MyBirdTail;