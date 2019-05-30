import MyPyramid from "../primitives/MyPyramid.js";

class MyBirdNose extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nose = new MyPyramid(scene);
        this.material = new CGFappearance(scene);
    }

    display() {
        this.material.apply();
        this.nose.display();
    }
}

export default MyBirdNose;