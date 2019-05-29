import Utils from "../Utils.js";
import MyTreeBranch from "./MyTreeBranch.js";

const BRANCH_SLICES = 50;

class MyRandomTreeBranch extends MyTreeBranch {
    constructor(scene) {
        super(scene);
        this.position = this.getRandomPosition();
        this.orientation = this.getRandomOrientation();
    }

    getRandomPosition() {
        let randomX = Utils.getRand(0, 3);
        let randomY = 0;
        let randomZ = Utils.getRand(0, 3);

        return [randomX, randomY, randomZ];
    }

    getRandomOrientation() {
        return Utils.getRand(0, 359);
    }
}

export default MyRandomTreeBranch;