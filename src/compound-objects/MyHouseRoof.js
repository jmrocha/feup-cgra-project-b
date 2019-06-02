import MyPyramid from "../primitives/MyPyramid.js";

class MyHouseRoof {
    constructor(scene, texture) {
        this.scene = scene;
        this.roof = new MyPyramid(scene, 4, 1);
        this.material = new CGFappearance(scene);
        this.texture = new CGFtexture(scene, texture);
        this.material.setTexture(this.texture);
    }

    display() {
        this.material.apply();
        this.roof.display();
    }
}

export default MyHouseRoof;