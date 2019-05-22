/**
 * MyScene
 * @constructor
 */

import MyCubeMap from "./compound-objects/MyCubeMap.js";
import MyHouse from "./compound-objects/MyHouse.js";
import MyBird from "./compound-objects/MyBird.js";
import MyLightning from "./compound-objects/MyLightning.js";
import config from './Configuration.js';

class MyScene extends CGFscene {
    constructor() {
        super();
        this.updateObservers = [];
    }

    init(application) {
        super.init(application);
        this.initCameras();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.displayAxis = config['axis_enabled'];
        this.axis = new CGFaxis(this);
        this.skybox = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this);
        this.lightning = new MyLightning(this);
        this.devObj = this.bird;

        this.setUpdatePeriod(5);

        this.setLights();

        this.flutterVelocity = config['bird']['flutter_velocity'];
        this.birdVelocity = config['bird']['velocity'];
        this.birdRotation = config['bird']['rotation'];
        this.speedFactor = 1;
        this.isDevEnabled = config['enable_dev_objecs'];
    }

    setLights() {
        let lights = config['lights']['default'];

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
        this.camera = this.getCamera(config['default_camera']);
    }

    getCamera(cameraId) {
        // todo: cache cameras
        let cameraSettings = config['cameras'][cameraId];
        let from = vec3.fromValues(...cameraSettings['from']);
        let to = vec3.fromValues(...cameraSettings['to']);

        return new CGFcamera(
            cameraSettings['fov'],
            cameraSettings['near'],
            cameraSettings['far'],
            from,
            to);
    }

    enableAxis(enable) {
        this.displayAxis = enable;
    }

    setDefaultAppearance() {
        let settings = config['default_appearance'];

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

        if (this.isDevEnabled) {
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
        let scale = config['skybox']['scale'];

        this.pushMatrix();
        {
            this.scale(scale, scale, scale);
            this.translate(0.5, 0.5, 0.5);
            this.skybox.display();
        }
        this.popMatrix();
        this.setGlobalAmbientLight(...config['default_global_ambient_light']);
    }

    translate2(x, y, z) {
        let scale = config['skybox']['scale'];
        super.translate(
            x * scale,
            y * scale,
            z * scale);
    }

    enableDev(enable) {
        if (enable) {
            this.isDevEnabled = true;
        } else {
            this.isDevEnabled = false;
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
        //this.bird.accelerate(-1);
    }

    handleKeyWDown() {
        console.log('key w down');
        this.bird.accelerate(this.birdVelocity * this.speedFactor);
    }

    handleKeySUp() {
        console.log('key s up');
    }

    handleKeySDown() {
        console.log('key s down');
        this.bird.accelerate(-this.birdVelocity * this.speedFactor);
    }

    handleKeyAUp() {
        console.log('key a up');
    }

    handleKeyADown() {
        console.log('key a down');
        this.bird.turn(-this.birdRotation * this.speedFactor);
    }

    handleKeyDUp() {
        console.log('key d up');
    }

    handleKeyDDown() {
        console.log('key d down');
        this.bird.turn(this.birdRotation * this.speedFactor);
    }

    handleKeyRUp() {
        console.log('key r up');
    }

    handleKeyRDown() {
        this.bird.reset();
    }

    handleKeyPUp() {
        console.log('key p up');
    }

    handleKeyPDown() {
        this.bird.takeBough();
    }

    handleKeyLUp() {
        this.lightning.stopFlash();
    }

    handleKeyLDown() {
        this.lightning.flash();
    }

    handleSpeedOnChange(value) {
        this.speedFactor = value;
        this.bird.setFlutterVelocity(this.flutterVelocity * value);
    }

    handleScaleOnChange(value) {
        this.bird.scale(value);
    }

    addObserver(obj) {
        this.updateObservers.push(obj);
    }
}

export default MyScene;