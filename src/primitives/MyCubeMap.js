/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

import Utils from "../Utils.js";
import MyQuad from "./MyQuad.js";
import config from "../Configuration.js";

const TEXTURE_WRAP = 'CLAMP_TO_EDGE';
const SCALE_FACTOR = config['skybox']['scale'];

class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.face = new MyQuad(scene);
        this.faceMaterial = new CGFappearance(scene);
        this.faceMaterial.setTextureWrap(TEXTURE_WRAP, TEXTURE_WRAP);

        this.setMaterial();
        this.setTextures();
    }

    setTextures() {
        let texture = config['skybox']['texture'];
        this.topTexture = new CGFtexture(this.scene, texture['top']);
        this.bottomTexture = new CGFtexture(this.scene, texture['bottom']);
        this.leftTexture = new CGFtexture(this.scene, texture['left']);
        this.rightTexture = new CGFtexture(this.scene, texture['right']);
        this.frontTexture = new CGFtexture(this.scene, texture['front']);
        this.backTexture = new CGFtexture(this.scene, texture['back']);
    }

    setMaterial() {
        let skybox = config['skybox']['material'];

        if (skybox['ambient'])
            this.faceMaterial.setAmbient(...skybox['ambient']);
        if (skybox['diffuse'])
            this.faceMaterial.setDiffuse(...skybox['diffuse']);
        if (skybox['specular'])
            this.faceMaterial.setSpecular(...skybox['specular']);
    }

    display() {
        this.scene.setMaxAmbientLight();
        this.scene.pushMatrix();
        {
            this.scene.scale(SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR);
            //this.scene.translate(0, 0.499, 0);
            let angle = Utils.degToRad(90);
            this.scene.rotate(angle, 0, 1, 0);
            this.displayFrontFace();
            this.displayBackFace();
            this.displayLeftFace();
            this.displayRightFace();
            this.displayTopFace();
            this.displayBottomFace();
        }
        this.scene.popMatrix();
        this.scene.resetAmbientLight();
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

export default MyCubeMap;
