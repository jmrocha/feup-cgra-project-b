import MyLSystem from "./MyLSystem.js";
import MyLightningBranch from "./MyLightningBranch";


class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene.addObserver(this);
        //this.deltaTime = 0:
        //this.elapsedTime = 0;
        //this.depth = 0;
    }

    initGrammar() {
        this.grammar = {
            "F": new MyLightningBranch(this.scene),
            "X": new MyLightningBranch(this.scene)
        }
    }

    flash() {
        console.log('flashing');
    }

    stopFlash() {
        console.log('flashing was stoppped');
    }

    update(deltaTime) {
        //this.deltaTime = deltaTime;
        //this.elapsedTime += this.deltaTime;
    }

    startAnimation(){
        //super.iterate();
        //this.depth++;
    }
}

export default MyLightning;