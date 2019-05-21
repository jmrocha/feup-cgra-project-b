class MyLSPlant extends MyLSystem {

    constructor(scene) {
        super(scene);
        this.scene = scene;
    }

    initGrammar() {
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        }
    }
}