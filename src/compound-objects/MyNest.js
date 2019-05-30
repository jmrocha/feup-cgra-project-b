import Plane from "../Plane.js";
import Utils from "../Utils.js";

class MyNest extends CGFobject {
    constructor(scene, position = [0, 0, 0]) {
        super(scene);
        this.position = position;
        this.nest = new Plane(scene);
        this.material = new CGFappearance(scene);
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.rotate(angle, 1, 0, 0);
            this.nest.display();
        }
        this.scene.popMatrix();
    }
}

export default MyNest;