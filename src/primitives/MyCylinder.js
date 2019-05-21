const VERTICES_PER_SLICE = 2;

class MyCylinder extends CGFobject {
    constructor(scene, slices = 6, texturePath = null) {
        super(scene);
        this.slices = slices;
        this.alphaAng = (Math.PI * 2) / this.slices;
        this.material = new CGFappearance(scene);
        this.numVertices = VERTICES_PER_SLICE * this.slices;

        if (texturePath)
            this.material.loadTexture(texturePath);

        this.initBuffers();

        this.isInterpolationEnabled = false;
    }

    interpolation(enable) {
        this.isInterpolationEnabled = enable;
    }

    initBuffers() {
        // todo: remove redundant vertices
        let alpha, beta;
        let cosAlpha, sinAlpha, cosBeta, sinBeta;
        let offset;
        let normal1, normal2;
        let tx1, tx2;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let slice = 0; slice <= this.slices; slice++) {
            offset = VERTICES_PER_SLICE * slice;
            alpha = this.alphaAng * slice;
            beta = alpha + this.alphaAng;
            // we subtract half the difference between the current angles to the greatest current angle
            cosAlpha = Math.cos(alpha);
            sinAlpha = Math.sin(alpha);
            cosBeta = Math.cos(beta);
            sinBeta = Math.sin(beta);
            normal1 = [cosAlpha, 0, -sinAlpha];
            normal2 = [cosBeta, 0, -sinBeta];
            tx1 = slice / this.slices;
            tx2 = (slice + 1) / this.slices;

            this.vertices.push(cosAlpha, 0, -sinAlpha);
            this.vertices.push(cosAlpha, 1, -sinAlpha);

            if (slice !== this.slices) {
                this.indices.push(offset, 2 + offset, 1 + offset);
                this.indices.push(2 + offset, 3 + offset, 1 + offset);
            }

            this.normals.push(...normal1);
            this.normals.push(...normal1);

            this.texCoords.push(tx1, 1);
            this.texCoords.push(tx1, 0);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        super.initGLBuffers();
    }

    /*
    0:
        0
        1
    1:
        2
        3
    2:
        4
        5
    3:
        6
        7

     */

    display() {
        this.material.apply();
        if (this.isInterpolationEnabled)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        super.display();
    }
}

export default MyCylinder;