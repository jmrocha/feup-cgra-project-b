import MyLSystem from "./MyLSystem.js";

class MyLSPlant extends MyLSystem {
    constructor(scene) {
        super(scene);
    }

    initGrammar() {
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        }
    }
}

export default MyLSPlant;