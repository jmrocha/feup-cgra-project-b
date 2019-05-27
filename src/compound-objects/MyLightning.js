import MyLSystem from "../primitives/MyCylinder.js";
import MyLSystem from "./MyLSystem.js";
import MyCylinder from "../primitives/MyCylinder";

class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene.addObserver(this);
    }

    initGrammar() {
        this.grammar = {
            "F": new MyCylinder(this.scene),
            "X": new MyLeaf(this.scene)
        }
    }

    flash() {
        console.log('flashing');
    }

    stopFlash() {
        console.log('flashing was stoppped');
    }

    update(t) {
        
    }
}

export default MyLightning;