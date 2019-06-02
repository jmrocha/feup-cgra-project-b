import Plane from "./Plane.js";
import Utils from "../Utils.js";
import MyUnitCubeQuad from "./MyUnitCubeQuad.js";
import MyTreeBranch from "./tree-branch/MyTreeBranch.js";
import {IMAGE_PATH} from "../Configuration.js";

class MyNest extends CGFobject {
    constructor(scene, position = [0, 0, 0], size = 1) {
        super(scene);
        this.position = position;
        this.nest = new MyUnitCubeQuad(scene);
        this.base = new Plane(scene);
        this.branch = new MyTreeBranch(scene);
        this.material = new CGFappearance(scene);
        this.material.loadTexture(IMAGE_PATH + '/bough-texture.png');
        this.size = size;
    }

    display() {

        this.scene.pushMatrix();
        {
            this.scene.translate(-1, 0, -1);
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.scale(this.size, this.size, this.size);
            this.displayBase();
            this.displayRightSide();
            this.displayLeftSide();
            this.displayBackSide();
            this.displayFrontSide();
        }
        this.scene.popMatrix();
    }

    displayBase() {
        this.material.apply();
        this.scene.pushMatrix();
        {
            this.scene.translate(1, 0, 1);
            this.scene.scale(2, 1, 2);
            this.scene.rotate(Utils.degToRad(-90), 1, 0, 0);

            this.base.display();
        }
        this.scene.popMatrix();
    }

    displayRightSide() {
        this.scene.pushMatrix();
        {
            this.scene.translate(2, 0, 0);
            for (let i = 0; i < 3; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.translate(0, 0.2 * i, 0);
                    this.branch.display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }

    displayLeftSide() {
        this.scene.pushMatrix();
        {
            for (let i = 0; i < 3; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.translate(0, 0.2 * i, 0);
                    this.branch.display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }

    displayFrontSide() {
        this.scene.pushMatrix();
        {
            this.scene.translate(0, 0, 2);
            this.scene.rotate(Utils.degToRad(90), 0, 1, 0);

            for (let i = 0; i < 3; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.translate(0, 0.2 * i, 0);
                    this.branch.display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }

    displayBackSide() {
        this.scene.pushMatrix();
        {
            this.scene.rotate(Utils.degToRad(90), 0, 1, 0);
            for (let i = 0; i < 3; i++) {
                this.scene.pushMatrix();
                {
                    this.scene.translate(0, 0.2 * i, 0);
                    this.branch.display();
                }
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }
}


export default MyNest;