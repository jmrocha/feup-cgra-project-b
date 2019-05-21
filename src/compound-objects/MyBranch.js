class MyBranch extends MyCylinder {
    constructor(scene) {
        super(scene, 3, null);
        this.scene = scene;
        this.branchMaterial = new CGFappearance(scene);
        this.branchMaterial.setAmbient(139 / 255, 69 / 255, 19 / 255, 1);
        this.branchMaterial.setDiffuse(139 / 255, 69 / 255, 19 / 255, 1);
        this.branchMaterial.setSpecular(139 / 255, 69 / 255, 19 / 255, 1);
        this.branchMaterial.setShininess(50);
    }

    display() {
        this.branchMaterial.apply();
        this.scene.pushMatrix();
        {
            this.scene.scale(0.5, 1, 0.5);
            super.display();
        }
        this.scene.popMatrix();
    }
}