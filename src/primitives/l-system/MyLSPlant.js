import MyLSystem from "./MyLSystem.js";
import MyBranch from "../tree/MyBranch.js";
import MyLeaf from "../tree/MyLeaf.js";
import Utils from "../../Utils.js";


class MyLSPlant extends MyLSystem {
    constructor(scene, position = [0, 0, 0], orientation = 0) {
        super(scene);
        this.position = position;
        this.orientation = Utils.degToRad(orientation);
        this.initGrammar();
    }

    initGrammar() {
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        }
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.rotate(this.orientation, 0, 1, 0);
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            super.display();
        }
        this.scene.popMatrix();
    }
}

export default MyLSPlant;