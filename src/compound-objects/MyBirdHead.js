import MyUnitCubeQuad from "./MyUnitCubeQuad.js";

class MyBirdHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.eye = new MyUnitCubeQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0.3, 0.3, 0.3, 1);
    }

    display() {
        this.material.apply();
        this.eye.display();
    }
}

export default MyBirdHead;