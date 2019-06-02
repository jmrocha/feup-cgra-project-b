import MyPrism from "../primitives/MyPrism.js";
import MyCylinder from "../primitives/MyCylinder.js";

class MyHousePillar {
    constructor(scene, texture) {
        this.scene = scene;
        this.pillar = new MyCylinder(scene, 12);
        this.material = new CGFappearance(scene);
        this.texture = new CGFtexture(scene, texture);
        this.material.setTexture(this.texture);
    }

    display() {
        this.material.apply();
        this.pillar.display();
    }
}

export default MyHousePillar;