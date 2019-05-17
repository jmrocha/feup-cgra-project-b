import {IMAGE_PATH} from "../Configuration.js";

/**
 * MyCone
 * @constructor
 */
export class MyCone extends CGFobject {
    constructor(scene, slices = 6) {
        super(scene);
        this.slices = slices;
        this.alphaAng = 2 * Math.PI / this.slices;
        this.initBuffers();
        this.material = new CGFappearance(scene);
        this.material.loadTexture(IMAGE_PATH + '/pattern3.jpg');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let ang = 0;

        for (let i = 0; i <= this.slices; i++) {

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i + 1) % this.slices, this.slices + 1);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI / 4.0), -Math.sin(ang));
            this.texCoords.push((Math.cos(ang) + 1) / 2, (Math.sin(ang) + 1) / 2);
            ang += this.alphaAng;
        }
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    display() {
        this.material.apply();
        super.display();
    }
}


