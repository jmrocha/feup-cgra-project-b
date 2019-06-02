import MyCylinder from "../MyCylinder.js";
import Utils from "../../Utils.js";
import {IMAGE_PATH} from "../../Configuration.js";

class MyBirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyCylinder(scene, 5);
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0.3, 0.3, 0.3, 1);
        this.material.loadTexture(IMAGE_PATH + '/bird-body-texture.jpg');
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);
            //this.scene.rotate(angle, 0, 0, 1);
            this.body.display();
        }
        this.scene.popMatrix();
    }
}

export default MyBirdBody;