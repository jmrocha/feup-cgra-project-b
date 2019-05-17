/**
 * MyScene
 * @constructor
 */

import {MyVoxelHill} from "./compound-objects/MyVoxelHill.js";
import {MyTreeGroupPatch} from "./compound-objects/MyTreeGroupPatch.js";
import {MyTreeRowPatch} from "./compound-objects/MyTreeRowPatch.js";
import {MyCubeMap} from "./compound-objects/MyCubeMap.js";
import {Configuration, TIME_OF_THE_DAY} from "./Configuration.js";
import {MyHouse} from "./compound-objects/MyHouse.js";
import {MyUnitCubeQuad} from "./primitives/MyUnitCubeQuad.js";
import {MyLightsource} from "./compound-objects/MyLightsource.js";

export class MyScene extends CGFscene {
    constructor() {
        super();
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

        this.initDevObjects();
        this.initSceneObjects();
    }

    initSceneObjects() {
        this.house = new MyHouse(this);
        this.hill1 = new MyVoxelHill(this);
        this.hill2 = new MyVoxelHill(this);
        this.grove1 = new MyTreeGroupPatch(this);
        this.grove2 = new MyTreeRowPatch(this);
        this.lamp = new MyLightsource(this);
    }

    initDevObjects() {
        this.obj = new MyUnitCubeQuad(this);
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
            this.obj.display();
        } else {
            this.displayScene();
        }

        // ---- END Primitive drawing section
    }

    displayScene() {
        this.displaySkybox();
        this.displayHouse();
        this.displayHills();
        this.displayGroves();
        this.displayLamp();
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

    displayHouse() {
        this.pushMatrix();
        {
            let scale = Configuration.getObjectsScale();
            this.translate2(0.25, 0, 0.45);
            this.scale(scale, scale, scale);
            this.house.display();
        }
        this.popMatrix();
    }

    displayHills() {
        this.displayHill1();
        this.displayHill2();
    }

    displayHill1() {
        this.pushMatrix();
        {
            this.hill1.setLevels(Configuration.getHillsLevels()[0]);
            this.translate2(0.80, 0, 0.3);
            this.scale(1.7, 1.7, 1.7);
            this.hill1.display();
        }
        this.popMatrix();
    }

    displayHill2() {
        this.pushMatrix();
        {
            this.hill2.setLevels(Configuration.getHillsLevels()[1]);
            let scale = Configuration.getObjectsScale();
            this.translate2(0.70, 0, 0.5);
            this.scale(1.7, 1.7, 1.7);
            this.hill2.display();
        }
        this.popMatrix();
    }

    displayGroves() {
        this.displayGrove1();
        this.displayGrove2();
    }

    displayGrove1() {
        this.pushMatrix();
        {
            let scale = Configuration.getObjectsScale();
            //this.translate2(-0.3, 0, -0.2);
            this.translate2(0.3, 0, 0.3);
            this.scale(scale, scale, scale);

            this.grove1.display();
        }
        this.popMatrix();
    }

    displayGrove2() {
        this.pushMatrix();
        {
            let scale = Configuration.getObjectsScale();
            //this.translate2(-0.5, 0, -0.2);
            this.scale(scale, scale, scale);
            this.grove2.display();
        }
        this.popMatrix();
    }

    displayLamp() {
        let scale = 3;
        this.pushMatrix();
        {
            this.translate2(0.3, 0, 0.6);
            this.scale(scale, scale, scale);
            this.lamp.display();
        }
        this.popMatrix();
    }

    setDay() {
        this.configuration.setDay();
        this.skybox.setDay();
        this.setLights();
    }

    setNight() {
        this.configuration.setNight();
        this.skybox.setNight();
        this.setLights();
    }

    setTimeOfTheDay(timeOfTheDay) {
        switch (timeOfTheDay) {
            case TIME_OF_THE_DAY.day:
                this.setDay();
                break;
            case TIME_OF_THE_DAY.night:
                this.setNight();
                break;
            default:
                console.assert(true, 'Invalid option');
                break;
        }
    }

    enableDev(enable) {
        if (enable) {
            Configuration.enableDevObjects();
            this.initDevObjects();
        } else {
            Configuration.disableDevObjects();
            this.initSceneObjects();
        }
    }

    setCamera(camera) {
        this.camera = camera;
    }

    getCamera(cameraId) {
        // todo: make configuration class singleton
        return this.configuration.getCamera(cameraId);
    }

    update(t) {

    }
}

export default MyScene;