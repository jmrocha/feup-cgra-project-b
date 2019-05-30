import MyUnitCubeQuad from "./MyUnitCubeQuad.js";

class MyBirdEye extends CGFobject {
    constructor(scene) {
        super(scene);
        this.eye = new MyUnitCubeQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0, 0, 0, 1);
    }

    display() {
        this.material.apply();
        this.eye.display();
    }
}

export default MyBirdEye;