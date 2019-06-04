import MyTreePatch from "./MyTreePatch.js";
import Utils from "../../Utils.js";

class MyRandomTreePatch extends MyTreePatch {
    constructor(scene) {
        super(scene);
        //this.position = this.getRandomPosition();
    }

    getRandomPosition() {
        let randomX = Utils.getRand(0, 10);
        let randomY = 0;
        let randomZ = Utils.getRand(0, 10);

        return [randomX, randomY, randomZ];
    }
}

export default MyRandomTreePatch;