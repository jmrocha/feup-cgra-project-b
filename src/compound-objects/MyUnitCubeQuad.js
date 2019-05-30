/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
import MyQuad from "../primitives/MyQuad.js";
import Utils from "../Utils.js";

class MyUnitCubeQuad extends CGFobject {
    constructor(scene, sidesTexture, topTexture, bottomTexture) {
        super(scene);
        this.face = new MyQuad(scene);

        this.material = new CGFappearance(scene);


        if (sidesTexture)
            this.sidesTexture = new CGFtexture(scene, sidesTexture);
        if (topTexture)
            this.topTexture = new CGFtexture(scene, topTexture);
        if (bottomTexture)
            this.bottomTexture = new CGFtexture(scene, bottomTexture);

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
        if (this.sidesTexture)
            this.setTexture(this.sidesTexture);
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0, 0.5);
            this.face.display();
        }
        this.scene.popMatrix();
    }

    displayBackFace() {
        if (this.sidesTexture)
            this.setTexture(this.sidesTexture);
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
        if (this.sidesTexture)
            this.setTexture(this.sidesTexture);
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
        if (this.sidesTexture)
            this.setTexture(this.sidesTexture);
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
        if (this.topTexture)
            this.setTexture(this.topTexture);
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
        if (this.bottomTexture)
            this.setTexture(this.bottomTexture);
        this.scene.pushMatrix();
        {
            let angle = Utils.degToRad(90);

            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(angle, 1, 0, 0);
            this.face.display();
        }
        this.scene.popMatrix();
    }
}

export default MyUnitCubeQuad;
