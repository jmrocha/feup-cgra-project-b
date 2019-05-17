import {MyUnitCubeQuad} from "../primitives/MyUnitCubeQuad.js";
import Utils from "../Utils.js";
import {Configuration} from "../Configuration.js";

export class MyVoxelHill {
    constructor(scene, levels = 1) {
        this.scene = scene;
        this.levels = levels; // height
        this.cube = new MyUnitCubeQuad(scene, Configuration.getCubeSideTexture(),
            Configuration.getCubeTopTexture(), Configuration.getCubeBottomTexture());
        this.cube.interpolation(true);
    }

    display() {
        let t = this.levels - 0.5;
        this.scene.pushMatrix();
        {
            this.scene.translate(0, t, 0);
            //this.scene.translate(t, t, t);
            //this.scene.translate(100 - 2 * t, 0, 0);
            this.scene.rotate(Utils.degToRad(90), 1, 0, 0);
            this.displayVoxelHill(this.levels);
        }
        this.scene.popMatrix();
    }

    displayVoxelHill(levels) {
        this.scene.pushMatrix();
        {
            for (let level = 1, i = 1; level <= levels; level++, i += 2) {
                this.displayCenteredMatrix(i, i);
                this.scene.translate(0, 0, 1);
            }
        }
        this.scene.popMatrix();
    }

    displayCenteredMatrix(rows, cols) {
        let x = 0.5 * (cols - 1);
        let y = 0.5 * (rows - 1);

        this.scene.pushMatrix();
        {
            this.scene.translate(-x, -y, 0);
            this.displayMatrix(rows, cols);
        }
        this.scene.popMatrix();
    }

    displayMatrix(rows, cols) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (this.belongsToPerimeter(rows, cols, row, col)) {
                    this.displayCube(row, col);
                }
            }
        }
    }

    belongsToPerimeter(rows, cols, row, col) {
        return row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
    }

    displayCube(x, y) {
        // todo: should we scale to make the edges notice? try with some texture...
        let scale = 1 / 500;

        this.scene.pushMatrix();
        {
            this.scene.translate(x + x * scale, y  + y * scale, 0);
            this.scene.rotate(Utils.degToRad(-90), 1, 0, 0);
            this.cube.display();
        }
        this.scene.popMatrix();
    }

    setLevels(levels) {
        this.levels = levels;
    }
}