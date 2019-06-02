/**
 * MyScene
 * @constructor
 */

import MyCubeMap from "./primitives/MyCubeMap.js";
import MyHouse from "./primitives/house/MyHouse.js";
import MyBird from "./primitives/bird/MyBird.js";
import MyLightning from "./primitives/l-system/lightning/MyLightning.js";
import config, {COLLISION_ERROR, NUMBER_OF_TREE_BRANCHES} from './Configuration.js';
import MyRandomTreeBranch from "./primitives/tree-branch/MyRandomTreeBranch.js";
import MyNest from "./primitives/MyNest.js";
import Utils from "./Utils.js";
import MyTerrain from "./primitives/MyTerrain.js";
import MyTreePatch from "./primitives/tree/MyTreePatch.js";

const WITHOUT_BOUGH_STATUS = 0;
const WITH_BOUGH_STATUS = 1;
const SCORE_MULTIPLIER = 1000;

class MyScene extends CGFscene {
    constructor() {
        super();
        this.updateObservers = [];
        this.isDevEnabled = config['enable_dev_objects'];
        this.displayAxis = config['axis_enabled'];
        this.birdVelocity = config['bird']['velocity'];
        this.birdRotation = config['bird']['rotation'];
        this.state = 'no-bough';
        this.collisionDetection = false;
        this.treeBranchesLeft = NUMBER_OF_TREE_BRANCHES;
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        this.boughStatusElement = document.getElementById('bough-status');
        this.boughsLeftElement = document.getElementById('boughs-left');

        this.updateScore(0);
        this.updateBoughsLeft(NUMBER_OF_TREE_BRANCHES);
        this.updateBoughStatus(WITHOUT_BOUGH_STATUS);

        this.thunderSound = new Audio('music/thunder.wav');
        this.dropBoughSound = new Audio('music/drop-bough-sound.wav');
        this.pickBoughSound = new Audio('music/pick-bough-sound.wav');
        this.backgroundSound = new Audio('music/background-sound.wav');
        this.backgroundSound.addEventListener('ended', function() {
            this.backgroundSound.currentTime = 0;
            this.backgroundSound.play();
        }, false);
        this.backgroundSound.play();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.displayAxis = config['axis_enabled'];
        this.terrain = new MyTerrain(this, config['terrain']['texture']['terrain'], config['skybox']['scale']);
        this.axis = new CGFaxis(this);
        this.skybox = new MyCubeMap(this);
        this.bird = new MyBird(this, 0, 0, [0, 5, 0]);
        this.lightning = new MyLightning(this, [-10, 11, -10], 90);
        this.treeBranches = this.getRandomTreeBranches();
        this.nest = new MyNest(this, [-5, 0.1, 9], 1);
        this.material = new CGFappearance(this);
        this.house = new MyHouse(this, [5, 2, -10]);
        this.trees = [
            new MyTreePatch(this, [-10, 2, -12], 25),
            new MyTreePatch(this, [-5, 2, -12], 25),
            new MyTreePatch(this, [0, 2, -12], 10),
            new MyTreePatch(this, [5, 2, -13], 10),
        ];

        this.setUpdatePeriod(20);
    }

    updateScore(value) {
        value = Math.ceil(value);
        this.scoreElement.innerHTML = `Score: ${value}`;
    }

    updateBoughStatus(value) {
        let attribute;
        let message;

        if (value === WITH_BOUGH_STATUS) {
            attribute = 'with-bough';
            message = 'with tree branch';
        } else {
            attribute = 'without-bough';
            message = 'without tree branch'
        }

        this.boughStatusElement.innerHTML = `Bird: ${message}`;
        this.boughStatusElement.setAttribute("class", attribute);
    }

    updateBoughsLeft(value) {
        this.boughsLeftElement.innerHTML = `Tree branches left: ${value}`;
    }

    getRandomTreeBranches() {
        let randomTreeBranches = [];

        for (let i = 0; i < NUMBER_OF_TREE_BRANCHES; i++) {
            randomTreeBranches.push(new MyRandomTreeBranch(this));
        }

        return randomTreeBranches;
    }

    addLights(lightsConfig) {
        let lights = new Array(8);

        for (let i = 0; i < 8; i++) {
            lights[i] = new CGFlight(this, i);
        }

        for (let i = 0; i < lightsConfig.length; i++) {
            lights[i] = new CGFlight(this, i);
            lights[i].setPosition(...lightsConfig[i]['position']);
            if (lightsConfig[i]['ambient'])
                lights[i].setAmbient(...lightsConfig[i]['ambient']);
            if (lightsConfig[i]['diffuse'])
                lights[i].setDiffuse(...lightsConfig[i]['diffuse']);
            if (lightsConfig[i]['specular'])
                lights[i].setSpecular(...lightsConfig[i]['specular']);
            if (lightsConfig[i]['enabled'])
                lights[i].enable();
            if (lightsConfig[i]['visible'])
                lights[i].setVisible(true);
            lights[i].update();
        }

        return lights;
    }

    setLights() {
        if (this.isDevEnabled) {
            this.lights = this.devLights;
        } else {
            this.lights = this.defaultLights;
        }
    }

    initLights() {
        let defaultLightsConfig = config['lights']['default'];
        let devLightsConfig = config['lights']['dev'];

        this.defaultLights = this.addLights(defaultLightsConfig);
        this.devLights = this.addLights(devLightsConfig);
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
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    resetAmbientLight() {
        this.setGlobalAmbientLight(...config['default_global_ambient_light']);
    }

    display() {
        this.material.apply();
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
        if (this.displayAxis) {
            this.displayAxisObj();
        }

        this.setDefaultAppearance();


        // ---- BEGIN Primitive drawing section


        // Default texture filtering in WebCGF is LINEAR.
        // Uncomment next line for NEAREST when magnifying, or
        // add a checkbox in the GUI to alternate in real time

        //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        if (this.isDevEnabled) {
            this.displayDev();
        } else {
            this.displayScene();
        }

        //console.log(this.state);
        // ---- END Primitive drawing section
    }

    detectCollisions() {
        if (this.state === 'no-bough') {
            this.detectBoughCollision();
        } else if (this.state === 'bough') {
            this.detectNestCollision();
        }
    }

    detectBoughCollision() {
        for (let i = 0; i < this.treeBranches.length; i++) {
            let treeBranch = this.treeBranches[i];
            if (treeBranch.pickable && this.collide(treeBranch, this.bird)) {
                this.pickBough(treeBranch);
                break;
            }
        }
    }

    addBough(bough) {
        this.treeBranches.push(bough);
        bough.position[1] = 0;
    }

    dropBough() {
        this.bird.dropBough();
        this.state = 'no-bough';
        this.updateBoughStatus(WITHOUT_BOUGH_STATUS);
        this.updateBoughsLeft(--this.treeBranchesLeft);
        this.score += this.bird.velocity * SCORE_MULTIPLIER;
        this.updateScore(this.score);
        this.dropBoughSound.play();
    }

    detectNestCollision() {
        if (this.collide(this.nest, this.bird)) {
            this.dropBough();
        }
    }

    pickBough(bough) {
        this.bird.pickBough(bough);
        this.treeBranches = this.treeBranches.filter(b => b !== bough);
        this.state = 'bough';
        // if bough is near the nest, avoid instantaneous collision between bough and nest
        this.disableCollisionDetection();
        this.updateBoughStatus(WITH_BOUGH_STATUS);
        this.score += this.bird.velocity * SCORE_MULTIPLIER;
        this.pickBoughSound.play();
    }

    collide(obj1, obj2) {
        return Utils.distance(obj1.position, obj2.position) <= COLLISION_ERROR;
    }

    setMaxAmbientLight() {
        this.setGlobalAmbientLight(1, 1, 1, 1);
    }

    displayAxisObj() {
        this.resetAmbientLight();
        this.axis.display();
    }

    displayDev() {
        //this.lig.display();
        this.lightning.display();
    }

    displayScene() {
        this.bird.display();
        this.terrain.display();
        this.treeBranches.forEach(b => b.display());
        this.nest.display();
        this.skybox.display();
        this.house.display();
        this.lightning.display();
        this.trees.forEach(t => t.display());
    }

    enableDev(enable) {
        this.isDevEnabled = enable;
        this.setLights();
    }

    setCamera(camera) {
        this.camera = camera;
    }

    update(currTime) {
        let deltaTime;

        this.lastTime = this.lastTime || currTime;
        deltaTime = currTime - this.lastTime;
        this.lastTime = currTime;

        if (this.collisionDetection)
            this.detectCollisions();

        this.checkKeys();

        this.updateObservers.forEach(subscriber => {
            subscriber.update(deltaTime);
        });
    }


    handleKeyWDown() {
        this.bird.accelerate(this.birdVelocity);
    }

    handleKeySDown() {
        this.bird.accelerate(-this.birdVelocity);
    }

    handleKeyADown() {
        this.bird.turn(-this.birdRotation);
    }

    handleKeyDDown() {
        this.bird.turn(this.birdRotation);
    }

    handleKeyRDown() {
        this.bird.reset();
    }

    handleKeyPDown() {
        this.collisionDetection = true;
        this.bird.takeBough();
    }

    handleKeyLDown() {
        this.lightning.flash();
        this.playThunder();
    }

    handleSpeedOnChange(value) {
        this.bird.setSpeedFactor(value);
    }

    handleScaleOnChange(value) {
        this.bird.scale(value);
    }

    addObserver(obj) {
        this.updateObservers.push(obj);
    }

    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.handleKeyWDown();
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.handleKeySDown();
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.handleKeyADown();
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.handleKeyDDown();
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.handleKeyRDown();
        }
    }

    flying() {
        this.disableCollisionDetection();
    }

    flyingUp() {
        this.disableCollisionDetection();
    }

    flyingDown() {
        this.enableCollisionDection();
    }

    enableCollisionDection() {
        this.collisionDetection = true;
    }

    disableCollisionDetection() {
        this.collisionDetection = false;
    }

    playThunder() {
        this.thunderSound.play();
    }

    playBird() {
        this.dropBoughSound.play();
    }

    playBackgroundMusic() {
        this.backgroundSound.play();
    }

    speedUpBackgroundMusic() {

    }

    slowBackgroundMusic() {

    }
}

export default MyScene;