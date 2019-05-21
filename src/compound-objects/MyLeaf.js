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
            super.display();
        }
        this.scene.popMatrix();
    }
}