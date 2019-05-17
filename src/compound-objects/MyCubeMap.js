/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

import Utils from "../Utils.js";
import {MyQuad} from "../primitives/MyQuad.js";
import {Configuration, TIME_OF_THE_DAY} from "../Configuration.js";

const TEXTURE_WRAP = 'CLAMP_TO_EDGE';

export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.configuration = Configuration.getInstance();
        this.face = new MyQuad(scene);
        this.faceMaterial = new CGFappearance(scene);
        this.faceMaterial.setTextureWrap(TEXTURE_WRAP, TEXTURE_WRAP);

        this.setMaterial();
        this.setTextures();
        this.setTimeOfTheDay();
    }

    setTextures() {
        this.dayTexture = {
            top: new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['top']),
            bottom: new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['bottom']),
            left: new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['left']),
            right: new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['right']),
            front: new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['front']),
            back: new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['back'])
        };

        this.nightTexture = {
            top: new CGFtexture(this.scene, Configuration.getSkyBoxNightTexture()['top']),
            bottom: new CGFtexture(this.scene, Configuration.getSkyBoxNightTexture()['bottom']),
            left: new CGFtexture(this.scene, Configuration.getSkyBoxNightTexture()['left']),
            right: new CGFtexture(this.scene, Configuration.getSkyBoxNightTexture()['right']),
            front: new CGFtexture(this.scene, Configuration.getSkyBoxNightTexture()['front']),
            back: new CGFtexture(this.scene, Configuration.getSkyBoxNightTexture()['back'])
        };
    }

    setMaterial() {
        let skybox = Configuration.getSkyboxConfig()['material'];

        if (skybox['ambient'])
            this.faceMaterial.setAmbient(...skybox['ambient']);
        if (skybox['diffuse'])
            this.faceMaterial.setDiffuse(...skybox['diffuse']);
        if (skybox['specular'])
            this.faceMaterial.setSpecular(...skybox['specular']);
    }

    setTimeOfTheDay() {
        switch (this.scene.configuration.getTimeOfTheDay()) {
            case TIME_OF_THE_DAY.day:
                this.setDay();
                break;
            case TIME_OF_THE_DAY.night:
                this.setNight();
                break;
            default:
                console.assert(true, 'Invalid default day.');
                break;
        }
    }

    display() {
        this.displayFrontFace();
        this.displayBackFace();
        this.displayLeftFace();
        this.displayRightFace();
        this.displayTopFace();
        this.displayBottomFace();
    }

    displayFrontFace() {
        this.faceMaterial.setTexture(this.frontTexture);
        this.faceMaterial.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0, -0.5);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayBackFace() {
        this.faceMaterial.setTexture(this.backTexture);
        this.faceMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(180);

            this.scene.translate(0, 0, 0.5);
            this.scene.rotate(angle, 0, 1, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayLeftFace() {
        this.faceMaterial.setTexture(this.leftTexture);
        this.faceMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);

            this.scene.translate(0.5, 0, 0);
            this.scene.rotate(angle, 0, 1, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayRightFace() {
        this.faceMaterial.setTexture(this.rightTexture);
        this.faceMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);

            this.scene.translate(-0.5, 0, 0);
            this.scene.rotate(angle, 0, 1, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayBottomFace() {
        this.faceMaterial.setTexture(this.bottomTexture);
        this.faceMaterial.apply();
        this.scene.pushMatrix();
        {
            let alpha = Utils.degToRad(-90);

            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(alpha, 1, 0, 0);
            this.scene.rotate(-alpha, 0, 0, 1);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayTopFace() {
        this.faceMaterial.setTexture(this.topTexture);
        this.faceMaterial.apply();
        this.scene.pushMatrix();
        {
            let alpha = Utils.degToRad(90);

            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(alpha, 1, 0, 0);
            this.scene.rotate(-alpha, 0, 0, 1);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    setDay() {
        this.topTexture = this.dayTexture['top'];
        this.bottomTexture = this.dayTexture['bottom'];
        this.leftTexture = this.dayTexture['left'];
        this.rightTexture = this.dayTexture['right'];
        this.frontTexture = this.dayTexture['front'];
        this.backTexture = this.dayTexture['back'];
    }

    setNight() {
        this.topTexture = this.nightTexture['top'];
        this.bottomTexture = this.nightTexture['bottom'];
        this.leftTexture = this.nightTexture['left'];
        this.rightTexture = this.nightTexture['right'];
        this.frontTexture = this.nightTexture['front'];
        this.backTexture = this.nightTexture['back'];
    }
}

