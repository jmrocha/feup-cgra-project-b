/**
 * MyInterface
 * @constructor
 */
import {Configuration, TIME_OF_THE_DAY} from "./Configuration.js";

class MyInterface extends CGFinterface {
    constructor() {
        super();

        this.configuration = Configuration.getInstance();

        this.obj = {
            enable_textures: true,
            day_of_the_time: Configuration.getDefaultTimeOfTheDay(),
            enableDev: Configuration.isDevObjectsEnabled(),
            camera: Configuration.getDefaultCameraId(),
            axis_enabled: Configuration.isAxisEnabled()
        };
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        this.gui.remember(this.obj);

        this.enableTextures = this.gui
            .add(this.obj, 'enable_textures')
            .name('Enable Textures')
            .onChange(this.scene.enableTextures.bind(this.scene));

        this.dayOfTheTime = this.gui
            .add(this.obj, 'day_of_the_time', [TIME_OF_THE_DAY.day, TIME_OF_THE_DAY.night])
            .name('Time of the day')
            .onChange(this.setTimeOfTheDay.bind(this));

        this.developmentEnabled = this.gui
            .add(this.obj, 'enableDev')
            .name('Development')
            .onChange(this.enableDev.bind(this));

        this.camera = this.gui
            .add(this.obj, 'camera', Configuration.getCamerasIds())
            .name('Camera')
            .onChange(this.setCamera.bind(this))
            .listen();

        this.axisEnabled = this.gui
            .add(this.obj, 'axis_enabled')
            .name('Axis')
            .onChange(this.enableAxis.bind(this));

        this.scene.enableTextures(this.enableTextures.getValue());
        this.setTimeOfTheDay(this.dayOfTheTime.getValue());
        this.enableAxis(this.axisEnabled.getValue());
        this.enableDev(this.developmentEnabled.getValue());
        this.setCamera(this.camera.getValue());

        return true;
    }

    enableAxis(enable) {
        this.scene.enableAxis(enable);
    }
    
    setTimeOfTheDay(timeOfTheDay) {
        this.configuration.setTimeOfTheDay(timeOfTheDay);
        this.scene.setTimeOfTheDay(timeOfTheDay);
    }

    enableDev(enable) {
        /*if (enable) {
            //this.camera.setValue('Primitive Camera');
            this.setCamera('Primitive Camera');
        } else {
            //this.camera.setValue('Skybox Camera');
            this.setCamera('Skybox Camera');
        }*/

        this.scene.enableDev(enable);
    }

    setCamera(cameraId) {
        let camera = this.configuration.getCamera(cameraId);

        this.setActiveCamera(camera);
        this.scene.setCamera(camera);
    }
}

export default MyInterface;