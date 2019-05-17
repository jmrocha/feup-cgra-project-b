import {MyPyramid} from "../primitives/MyPyramid.js";
import Utils from "../Utils.js";

export class MyLightsource {

    constructor(scene) {
        this.scene = scene;
        this.base = new MyPyramid(scene, 4, 1);
        this.lantern = new MyPyramid(scene, 4, 1);
        this.basematerial = new CGFappearance(this.scene);
        {
            this.basematerial.setAmbient(85 / 255, 107 / 255, 47 / 255, 1);
            this.basematerial.setDiffuse(85 / 255, 107 / 255, 47 / 255, 1);
        }
        this.glassmaterial = new CGFappearance(this.scene);
        {
            this.glassmaterial.setAmbient(240 / 255,230 / 255,140 / 255, 1);
            this.glassmaterial.setDiffuse(240 / 255,230 / 255,140 / 255, 1);
        }
    }

    display() {
        this.displayBase();
        this.displayLantern();
    }

    displayLantern() {
        this.scene.pushMatrix();
        {
            this.glassmaterial.apply();
            this.scene.translate(0, 1.95, 0);
            this.scene.rotate(Utils.degToRad(180), 1, 0, 0);
            this.lantern.display();
        }
        this.scene.popMatrix();
    }

    displayBase() {
        this.scene.pushMatrix();
        {
            this.basematerial.apply();
            this.base.display();
        }
        this.scene.popMatrix();
    }

}