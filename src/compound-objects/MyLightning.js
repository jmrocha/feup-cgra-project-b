import MyLSystem from "./MyLSystem.js";

class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene.addObserver(this);
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