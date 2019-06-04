import MyUnitCubeQuad from "../MyUnitCubeQuad.js";

class MyHouseWall {
    constructor(scene, texture) {
        this.scene = scene;
        this.wall = new MyUnitCubeQuad(scene);
        this.material = new CGFappearance(scene);
        this.texture = new CGFtexture(scene, texture);
        this.material.setTexture(this.texture);
        this.wall.setRightTexture(this.texture);
        this.wall.setLeftTexture(this.texture);
        this.wall.setFrontTexture(this.texture);
        this.wall.setBackTexture(this.texture);
        this.wall.setTopTexture(this.texture);
        this.wall.setBottomTexture(this.texture);
    }

    display() {
        this.material.apply();
        this.wall.display();
    }
}

export default MyHouseWall;