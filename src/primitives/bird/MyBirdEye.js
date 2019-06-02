import MyUnitCubeQuad from "../MyUnitCubeQuad.js";
import {IMAGE_PATH} from "../../Configuration.js";

class MyBirdEye extends CGFobject {
    constructor(scene) {
        super(scene);
        let material = new CGFappearance(scene);
        material.setDiffuse(0, 0, 0, 1);
        let texture = new CGFtexture(scene, IMAGE_PATH + '/bird-eye-texture.jpg');
        this.eye = new MyUnitCubeQuad(scene);
        this.eye.setLeftMaterial(material);
        this.eye.setTopMaterial(material);
        this.eye.setBottomMaterial(material);
        this.eye.setFrontMaterial(material);
        this.eye.setBackMaterial(material);
        this.eye.setRightTexture(texture);
    }

    display() {
        this.eye.display();
    }
}

export default MyBirdEye;