import MyLSPlant from "../l-system/MyLSPlant.js";
import Utils from "../../Utils.js";

class MyTreePatch {
    constructor(scene, position = [0, 0, 0], numberOfTrees = 10) {
        this.scene = scene;
        this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.angle = 30.0;
        this.iterations = 1;
        this.scaleFactor = 0.5;
        this.treeArray = [];
        this.position = position;

        for (let i = 0; i < numberOfTrees; i++) {
            let pos = this.getRandomPosition();
            let orientation = this.getRandomOrientation();

            this.treeArray.push(new MyLSPlant(scene, pos, orientation));
            this.treeArray[i].generate(
                this.axiom,
                {
                    "F": [this.ruleF],
                    "X": [this.ruleX, "F[-X][X]+X", "F[+X]-X", "F[/X][X]F[\\\\X]+X", "F[\\X][X]/X", "F[/X]\\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X"]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }
    }

    getRandomPosition() {
        let x, y, z;
        let n = 1;

        x = Utils.getRand(-n, n);
        y = 0;
        z = Utils.getRand(n, n);

        //return [this.position[0] + x, this.position[1] + y, this.position[2] + z];
        return [x, y, z];
    }

    getRandomOrientation() {
        return Utils.getRand(0, 359);
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.treeArray.forEach(t => t.display());
        }
        this.scene.popMatrix();
    }
}

export default MyTreePatch;