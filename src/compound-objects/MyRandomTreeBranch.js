import Utils from "../Utils.js";
import MyTreeBranch from "./MyTreeBranch.js";

class MyRandomTreeBranch extends MyTreeBranch {
    constructor(scene) {
        super(scene);
        this.position = this.getRandomPosition();
        this.orientation = this.getRandomOrientation();
        this.size = 1;
    }

    getRandomPosition() {
        let randomX = Utils.getRand(-5, 10);
        let randomY = 0;
        let randomZ = Utils.getRand(-5, 10);

        return [randomX, randomY, randomZ];
    }

    getRandomOrientation() {
        return Utils.getRand(0, 359);
    }
}

export default MyRandomTreeBranch;