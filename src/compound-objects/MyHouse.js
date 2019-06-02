import Utils from "../Utils.js";
import MyHouseRoof from "./MyHouseRoof.js";
import config from "../Configuration.js";
import MyHouseWall from "./MyHouseWall.js";
import MyHousePillar from "./MyHousePillar.js";

const PILLAR_POS = 0.75;
const PILLAR_SCALE = [0.1, 1, 0.1];

class MyHouse {
    constructor(scene, position = [0, 0, 0]) {
        this.scene = scene;
        this.walls = new MyHouseWall(scene, config['house']['wall_texture']);
        this.roof = new MyHouseRoof(scene, config['house']['roof_texture']);
        this.pillar = new MyHousePillar(scene, config['house']['pillar_texture']);
        this.roofMaterial = new CGFappearance(scene);
        this.roofMaterial.setAmbient(178 / 255, 34 / 255, 34 / 255, 1);
        this.roofMaterial.setSpecular(178 / 255, 34 / 255, 34 / 255, 1);
        this.roofMaterial.setShininess(10);
        this.position = position;
    }

    display() {
        this.scene.pushMatrix();
        {
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.displayPillars();
            this.displayWalls();
            this.displayRoof();
        }
        this.scene.popMatrix();
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