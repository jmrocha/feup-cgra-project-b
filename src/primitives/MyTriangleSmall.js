class MyTriangleSmall extends CGFobject {
    constructor(scene, texCoords) {
        super(scene);
        this.texCoords = texCoords;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0, 0,	//0
            0, 0.5, 0,	//1
            0.5, 0, 0,	//2
            0, 0, 0	    //3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 3, 1,
            1, 3, 2
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

export default MyTriangleSmall;