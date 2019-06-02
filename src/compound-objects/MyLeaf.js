import MyDiamond from "../primitives/MyDiamond";

class MyLeaf extends MyDiamond {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.leafMaterial = new CGFappearance(scene);
        this.leafMaterial.setAmbient(35 / 255, 138 / 255, 34 / 255, 1);
        this.leafMaterial.setDiffuse(35 / 255, 138 / 255, 34 / 255, 1);
        this.leafMaterial.setSpecular(35 / 255, 138 / 255, 34 / 255, 1);
        this.leafMaterial.setShininess(50);
    }

    display() {
        this.leafMaterial.apply();
        this.scene.pushMatrix();
        {
            this.scene.scale(0.5, 0.5, 0.5);
            super.display();
        }
        this.scene.popMatrix();
    }
}

export default MyLeaf;