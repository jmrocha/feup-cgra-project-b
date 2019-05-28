import Plane from "../Plane.js";
import Utils from "../Utils.js";

class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nest = new Plane(scene);
    }

    display() {
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);
            this.scene.rotate(angle, 1, 0, 0);
            this.nest.display();
        }
        this.scene.popMatrix();
    }
}

export default MyNest;