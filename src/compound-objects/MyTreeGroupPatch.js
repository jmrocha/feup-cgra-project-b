import {MyTree} from "../compound-objects/MyTree.js";
import Utils from "../Utils.js";


export class MyTreeGroupPatch {
    constructor(scene) {
        this.scene = scene;
        this.tree = new MyTree(scene, 1, 0.2, 1, 0.5);
        this.randsX = [];
        this.randsZ = [];

        for (let i = 0; i < 3; i++) {
            this.randsX[i] = Utils.getRand(0, 2);
            this.randsZ[i] = Utils.getRand(0, 2);
        }
    }

    display() {
        let x, y, z;

        y = 0;

        for (let i = 0; i < 3; i++) {
            x = 2 * i + this.randsX[i];
            for (let j = 0; j < 3; j++) {
                z = 2 * j + this.randsZ[i];
                this.displayTree(x, y, z);
            }
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