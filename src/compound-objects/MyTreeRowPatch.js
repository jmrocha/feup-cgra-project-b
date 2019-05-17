import {MyTree} from "../compound-objects/MyTree.js";
import Utils from "../Utils.js";

export class MyTreeRowPatch {
    constructor(scene) {
        this.scene = scene;
        this.tree = new MyTree(scene, 1, 0.2, 1, 0.5);

        this.randsX = [];
        this.randsZ = [];

        for (let i = 0; i < 6; i++) {
            this.randsX[i] = Utils.getRand(1, 2);
            this.randsZ[i] = Utils.getRand(1, 2);
        }
    }

    display() {
        let x, y, z;

        y = 0;

        for (let i = 0; i < 6; i++) {
            x = i * 2 + this.randsX[i];
            z = this.randsZ[i];
            this.displayTree(x, y, z);
        }
    }

    displayTree(x, y, z) {
        this.scene.pushMatrix();
        {
            this.scene.translate(x, y, z);
            this.tree.display();
        }
        this.scene.popMatrix();
    }
}