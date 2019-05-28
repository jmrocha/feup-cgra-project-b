import MyCylinder from "../primitives/MyCylinder.js";
import Utils from "../Utils.js";

const BRANCH_SLICES = 50;

class MyTreeBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.branch = new MyCylinder(scene, BRANCH_SLICES);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.material.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.material.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.material.setShininess(10.0);

        this.scale = [0.1, 0.1, 3];
        this.branchDimension = this.branch.getDimension();
        this.branchTY = this.branchDimension[1] / 2;
    }

    display() {
        this.material.apply();

        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);
            this.scene.scale(...this.scale);
            this.scene.translate(0, this.branchTY, 0);
            this.scene.rotate(angle, 1, 0, 0);
            this.branch.display();
        }
        this.scene.popMatrix();
    }
}

export default MyTreeBranch;