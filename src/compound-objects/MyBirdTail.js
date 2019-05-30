import MyPyramid from "../primitives/MyPyramid.js";

class MyBirdTail extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tail = new MyPyramid(scene);
        this.material = new CGFappearance(scene);
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