import {MyCylinder} from "../primitives/MyCylinder.js";
import {MyCone} from "../primitives/MyCone.js";
import Utils from "../Utils.js";
import {Configuration} from "../Configuration.js";


export class MyTree {
    constructor(scene, trunkHeight = 1.2, trunkRadius = 0.2, treeTopHeight = 2, treeTopRadius = 1,
                trunkTexture = null, treeTopTexture = null) {
        this.configuration = Configuration.getInstance();
        this.scene = scene;
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        trunkTexture = trunkTexture ? trunkTexture : Configuration.getTrunkTexture();
        treeTopTexture = treeTopTexture ? treeTopTexture: Configuration.getTreeTopTexture();
        this.trunk = new MyCylinder(scene, 6, trunkTexture);
        this.trunk.interpolation(true);
        this.treeTop = new MyCone(scene);
        this.treeTopMaterial = new CGFappearance(scene);
        this.treeTopMaterial.setAmbient(0, 100 / 255, 0);
        this.treeTopMaterial.setDiffuse(0, 100 / 255, 0);
        this.treeTopMaterial.setShininess(100);
    }

    display() {
        this.displayTrunk();
        this.displayTreeTop();
    }

    displayTrunk() {
        this.scene.pushMatrix();
        {
            this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
            this.trunk.display();
        }

        this.scene.popMatrix();
    }

    displayTreeTop() {
        this.treeTopMaterial.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(0, this.trunkHeight, 0);
            this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);

            this.treeTop.display();
        }
        this.scene.popMatrix();
    }
}