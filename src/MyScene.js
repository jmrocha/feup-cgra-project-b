/**
 * MyScene
 * @constructor
 */

import MyCubeMap from "./compound-objects/MyCubeMap.js";
import Configuration from "./Configuration.js";
import MyHouse from "./compound-objects/MyHouse.js";
import MyBird from "./compound-objects/MyBird.js";

class MyScene extends CGFscene {
    constructor() {
        super();
        this.updateObservers = [];
    }

    init(application) {
        super.init(application);
        this.configuration = Configuration.getInstance();
        this.initCameras();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.displayAxis = Configuration.isAxisEnabled();
        this.axis = new CGFaxis(this);
        this.skybox = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this);
        this.devObj = new MyBird(this);

        this.setUpdatePeriod(5);

        this.setLights();
    }

    setLights() {
        let lights = this.configuration.getLights();

        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i].disable();
            this.lights[i].update();
        }

        for (let i = 0; i < lights.length; i++) {
            this.lights[i].setPosition(...lights[i]['position']);
            if (lights[i]['ambient'])
                this.lights[i].setAmbient(...lights[i]['ambient']);
            if (lights[i]['diffuse'])
                this.lights[i].setDiffuse(...lights[i]['diffuse']);
            if (lights[i]['specular'])
                this.lights[i].setSpecular(...lights[i]['specular']);
            if (lights[i]['enabled'] === true)
                this.lights[i].enable();
            this.lights[i].update();
        }
    }

    initCameras() {
        this.camera = this.configuration.getDefaultCamera();
    }

    enableAxis(enable) {
        this.displayAxis = enable;
    }

    setDefaultAppearance() {
        let settings = Configuration.getDefaultAppearance();

        if (settings['ambient'])
            this.setAmbient(...settings['ambient']);
        if (settings['diffuse'])
            this.setDiffuse(...settings['diffuse']);
        if (settings['specular'])
            this.setSpecular(...settings['specular']);
        if (settings['shininess'])
            this.setAmbient(settings['shininess']);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section


        // Default texture filtering in WebCGF is LINEAR.
        // Uncomment next line for NEAREST when magnifying, or
        // add a checkbox in the GUI to alternate in real time

        //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        if (Configuration.isDevObjectsEnabled()) {
            this.devObj.display();
        } else {
            this.displayScene();
        }

        // ---- END Primitive drawing section
    }

    displayScene() {
        this.displaySkybox();
        this.house.display();
    }

    displaySkybox() {
        this.setGlobalAmbientLight(1, 1, 1, 1);
        let scale = Configuration.getSkyboxScale();

        this.pushMatrix();
        {
            this.scale(scale, scale, scale);
            this.translate(0.5, 0.5, 0.5);
            this.skybox.display();
        }
        this.popMatrix();
        this.setGlobalAmbientLight(...Configuration.getDefaultGlobalAmbient());
    }

    translate2(x, y, z) {
        let scale = Configuration.getSkyboxScale();
        super.translate(
            x * scale,
            y * scale,
            z * scale);
    }

    enableDev(enable) {
        if (enable) {
            Configuration.enableDevObjects();
        } else {
            Configuration.disableDevObjects();
        }
    }

    setCamera(camera) {
        this.camera = camera;
    }

    update(currTime) {
        let deltaTime;

        this.lastTime = this.lastTime || currTime;
        deltaTime = currTime - this.lastTime;
        this.lastTime = currTime;

        this.updateObservers.forEach(subscriber => {
            subscriber.update(deltaTime);
        });
    }

    handleKeyWUp() {
        console.log('key w up');
    }

    handleKeyWDown() {
        console.log('key w down');
        this.bird.accelerate(1 / 1000);
    }

    handleKeySUp() {
        console.log('key s up');
    }

    handleKeySDown() {
        console.log('key s down');
        this.bird.accelerate(-1 / 1000);
    }

    handleKeyAUp() {
        console.log('key a up');
    }

    handleKeyADown() {
        console.log('key a down');
        this.bird.turn(25);
    }

    handleKeyDUp() {
        console.log('key d up');
    }

    handleKeyDDown() {
        console.log('key d down');
        this.bird.turn(-25);
    }

    handleKeyRUp() {
        console.log('key r up');
    }

    handleKeyRDown() {
        console.log('key r down');
        this.bird.accelerate(0);
    }

    handleKeyPUp() {
        console.log('key p up');
    }

    handleKeyPDown() {
        console.log('key p down');
    }

    handleKeyLUp() {
        console.log('key l up');
    }

    handleKeyLDown() {
        console.log('key l down');
    }

    handleSpeedOnChange(value) {
        console.log('speed: ' + value);
    }

    handleScaleOnChange(value) {
        console.log('scale: ' + value);
    }

    addObserver(obj) {
        this.updateObservers.push(obj);
    }
}

export default MyScene;