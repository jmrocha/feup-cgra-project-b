/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
import MyQuad from "./MyQuad.js";
import Utils from "../Utils.js";

class MyUnitCubeQuad {
    constructor(scene) {
        this.scene = scene;
        this.face = new MyQuad(scene);

        this.leftTexture = null;
        this.rightTexture = null;
        this.topTexture = null;
        this.bottomTexture = null;
        this.frontTexture = null;
        this.backTexture = null;

        let defaultMaterial = new CGFappearance(scene);
        this.leftMaterial = defaultMaterial;
        this.rightMaterial = defaultMaterial;
        this.topMaterial = defaultMaterial;
        this.bottomMaterial = defaultMaterial;
        this.frontMaterial = defaultMaterial;
        this.backMaterial = defaultMaterial;

        this.isInterpolationEnabled = false;
    }

    display() {
        this.displayFrontFace();
        this.displayBackFace();
        this.displayLeftFace();
        this.displayRightFace();
        this.displayTopFace();
        this.displayBottomFace();
    }

    interpolation(enable) {
        this.isInterpolationEnabled = enable;
    }

    setTexture(tex) {
        this.material.setTexture(tex);
        this.material.apply();
        if (this.isInterpolationEnabled)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    }

    displayFrontFace() {
        this.frontMaterial.setTexture(this.frontTexture);
        this.frontMaterial.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0, 0.5);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayBackFace() {
        this.backMaterial.setTexture(this.backTexture);
        this.backMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(180);

            this.scene.translate(0, 0, -0.5);
            this.scene.rotate(angle, 0, 1, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayLeftFace() {
        this.leftMaterial.setTexture(this.leftTexture);
        this.leftMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);

            this.scene.translate(-0.5, 0, 0);
            this.scene.rotate(angle, 0, 1, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayRightFace() {
        this.rightMaterial.setTexture(this.rightTexture);
        this.rightMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);

            this.scene.translate(0.5, 0, 0);
            this.scene.rotate(angle, 0, 1, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayTopFace() {
        this.topMaterial.setTexture(this.topTexture);
        this.topMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(-90);

            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(angle, 1, 0, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayBottomFace() {
        this.bottomMaterial.setTexture(this.bottomTexture);
        this.bottomMaterial.apply();
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);

            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(angle, 1, 0, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    setFrontTexture(texture) {
        this.frontTexture = texture;
    }

    setBackTexture(texture) {
        this.backTexture = texture;
    }

    setLeftTexture(texture) {
        this.leftTexture = texture;
    }

    setRightTexture(texture) {
        this.rightTexture = texture;
    }

    setTopTexture(texture) {
        this.topTexture = texture;
    }

    setBottomTexture(texture) {
        this.bottomTexture = texture;
    }

    setFrontMaterial(material) {
        this.frontMaterial = material;
    }

    setBackMaterial(material) {
        this.backMaterial = material;
    }

    setLeftMaterial(material) {
        this.leftMaterial = material;
    }

    setRightMaterial(material) {
        this.rightMaterial = material;
    }

    setTopMaterial(material) {
        this.topMaterial = material;
    }

    setBottomMaterial(material) {
        this.bottomMaterial = material;
    }
}

export default MyUnitCubeQuad;
