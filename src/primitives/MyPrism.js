const VERTICES_PER_SLICE = 4;

class MyPrism extends CGFobject {
    constructor(scene, slices = 6, texturePath = null) {
        super(scene);
        this.slices = slices;
        this.rotation = (Math.PI * 2) / this.slices;
        this.material = new CGFappearance(scene);

        if (texturePath)
            this.material.loadTexture(texturePath);

        this.initBuffers();
    }

    initBuffers() {
        let alpha, beta, gamma;
        let cosAlpha, sinAlpha, cosBeta, sinBeta, cosGamma, sinGamma;
        let offset;
        let normal;
        let tx1, tx2;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let slice = 0; slice < this.slices; slice++) {
            offset = VERTICES_PER_SLICE * slice;
            alpha = this.rotation * slice;
            beta = alpha + this.rotation;
            // we subtract half the difference between the current angles to the greatest current angle
            gamma = beta - ((beta - alpha) / 2);
            cosAlpha = Math.cos(alpha);
            sinAlpha = Math.sin(alpha);
            cosBeta = Math.cos(beta);
            sinBeta = Math.sin(beta);
            cosGamma = Math.cos(gamma);
            sinGamma = Math.sin(gamma);

            normal = [cosGamma, 0, -sinGamma];
            tx1 = slice / this.slices;
            tx2 = (slice + 1) / this.slices;

            this.vertices.push(cosAlpha, 0, -sinAlpha);
            this.vertices.push(cosAlpha, 1, -sinAlpha);
            this.vertices.push(cosBeta, 0, -sinBeta);
            this.vertices.push(cosBeta, 1, -sinBeta);

            this.indices.push(offset, 2 + offset, 1 + offset);
            this.indices.push(2 + offset, 3 + offset, 1 + offset);

            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.texCoords.push(tx1, 1);
            this.texCoords.push(tx1, 0);
            this.texCoords.push(tx2, 1);
            this.texCoords.push(tx2, 0);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        super.initGLBuffers();
    }

    display() {
        this.material.apply();
        super.display();
    }
}

export default MyPrism;