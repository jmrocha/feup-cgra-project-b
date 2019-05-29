import MyCylinder from "../primitives/MyCylinder";

class MyLightningBranch extends MyCylinder {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.lightingMaterial = new CGFappearance(scene);
        this.lightingMaterial.setAmbient(75 / 255, 241 / 255, 253 / 255, 1);
        this.lightingMaterial.setDiffuse(75 / 255, 241 / 255, 253 / 255, 1);
        this.lightingMaterial.setSpecular(75 / 255, 241 / 255, 253 / 255, 1);
        this.lightingMaterial.setShininess(50);
    }

    display() {
        this.lightingMaterial.apply();
        this.scene.pushMatrix();
        {
            this.scene.scale(0.1, 1, 0.1);
            super.display();
        }
        this.scene.popMatrix();
    }
}

export default MyLightningBranch;