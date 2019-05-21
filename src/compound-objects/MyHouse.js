import MyUnitCubeQuad from "../primitives/MyUnitCubeQuad.js";
import MyPrism from "../primitives/MyPrism.js";
import MyPyramid from "../primitives/MyPyramid.js";
import Utils from "../Utils.js";

const PILLAR_POS = 0.75;
const PILLAR_SCALE = [0.1, 1, 0.1];

class MyHouse {
    constructor(scene) {
        this.scene = scene;
        this.walls = new MyUnitCubeQuad(scene);
        this.roof = new MyPyramid(scene, 4, 1);
        this.pillar = new MyPrism(scene);
        this.roofMaterial = new CGFappearance(scene);
        this.roofMaterial.setAmbient(178 / 255, 34 / 255, 34 / 255, 1);
        this.roofMaterial.setSpecular(178 / 255, 34 / 255, 34 / 255, 1);
        this.roofMaterial.setShininess(10);
    }

    display() {
        this.displayPillars();
        this.displayWalls();
        this.displayRoof();
    }

    displayWalls() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0.5, 0);
            this.walls.display();
        }
        this.scene.popMatrix();
    }

    displayRoof() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 1, 0);
            this.scene.scale(1.5, 1.5, 1.5);
            this.scene.rotate(Utils.degToRad(45), 0, 1, 0);
            this.roofMaterial.apply();
            this.roof.display();
        }
        this.scene.popMatrix();
    }

    displayPillars() {
        this.displayPillar1();
        this.displayPillar2();
        this.displayPillar3();
        this.displayPillar4();
    }

    displayPillar1() {
        this.scene.pushMatrix();
        {
            this.scene.translate(PILLAR_POS, 0, -PILLAR_POS);
            this.scene.scale(...PILLAR_SCALE);
            this.pillar.display();
        }
        this.scene.popMatrix();
    }

    displayPillar2() {
        this.scene.pushMatrix();
        {
            this.scene.translate(PILLAR_POS, 0, PILLAR_POS);
            this.scene.scale(...PILLAR_SCALE);
            this.pillar.display();
        }
        this.scene.popMatrix();
    }

    displayPillar3() {
        this.scene.pushMatrix();
        {
            this.scene.translate(-PILLAR_POS, 0, PILLAR_POS);
            this.scene.scale(...PILLAR_SCALE);
            this.pillar.display();
        }
        this.scene.popMatrix();
    }

    displayPillar4() {
        this.scene.pushMatrix();
        {
            this.scene.translate(-PILLAR_POS, 0, -PILLAR_POS);
            this.scene.scale(...PILLAR_SCALE);
            this.pillar.display();
        }
        this.scene.popMatrix();
    }
}

export default MyHouse;