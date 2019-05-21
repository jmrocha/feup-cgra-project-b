/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

import Utils from "../Utils.js";
import {MyQuad} from "../primitives/MyQuad.js";
import {Configuration} from "../Configuration.js";

const TEXTURE_WRAP = 'CLAMP_TO_EDGE';

export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.face = new MyQuad(scene);
        this.faceMaterial = new CGFappearance(scene);
        this.faceMaterial.setTextureWrap(TEXTURE_WRAP, TEXTURE_WRAP);

        this.setMaterial();
        this.setTextures();
    }

    setTextures() {
        this.topTexture = new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['top']);
        this.bottomTexture = new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['bottom']);
        this.leftTexture = new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['left']);
        this.rightTexture = new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['right']);
        this.frontTexture = new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['front']);
        this.backTexture = new CGFtexture(this.scene, Configuration.getSkyBoxDayTexture()['back']);
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
}

