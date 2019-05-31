import MyUnitCubeQuad from "./MyUnitCubeQuad.js";

class MyBirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyUnitCubeQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setDiffuse(0.3, 0.3, 0.3, 1);
    }

    display() {
        this.material.apply();
        this.body.display();
    }
}

export default MyBirdBody;