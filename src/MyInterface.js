/**
 * MyInterface
 * @constructor
 */
import config from './Configuration.js';

class MyInterface extends CGFinterface {
    constructor() {
        super();

        this.obj = {
            enable_textures: true,
            enable_dev: config['enable_dev_objects'],
            camera: config['default_camera'],
            axis_enabled: config['axis_enabled'],
            speed_factor: 1,
            scale_factor: 1,
        };

        this.handleDevOnChange = this.handleDevOnChange.bind(this);
        this.handleCameraOnChange = this.handleCameraOnChange.bind(this);
        this.handleAxisOnChange = this.handleAxisOnChange.bind(this);
        this.handleSpeedOnChange = this.handleSpeedOnChange.bind(this);
        this.handleScaleOnChange = this.handleScaleOnChange.bind(this);
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        this.gui.remember(this.obj);

        this.speedFactor = this.gui
            .add(this.obj, 'speed_factor', 0.1, 3)
            .name('Speed Factor')
            .onChange(this.handleSpeedOnChange);

        this.scaleFactor = this.gui
            .add(this.obj, 'scale_factor', 0.5, 3)
            .name('Scale Factor')
            .onChange(this.handleScaleOnChange);

        this.developmentEnabled = this.gui
            .add(this.obj, 'enable_dev')
            .name('Development')
            .onChange(this.handleDevOnChange);

        this.camera = this.gui
            .add(this.obj, 'camera', Object.keys(config['cameras']))
            .name('Camera')
            .onChange(this.handleCameraOnChange)
            .listen();

        this.axisEnabled = this.gui
            .add(this.obj, 'axis_enabled')
            .name('Axis')
            .onChange(this.handleAxisOnChange);

        this.handleAxisOnChange(this.axisEnabled.getValue());
        this.handleDevOnChange(this.developmentEnabled.getValue());
        this.handleCameraOnChange(this.camera.getValue());
        this.handleSpeedOnChange(this.speedFactor.getValue());
        this.handleScaleOnChange(this.scaleFactor.getValue());

        this.initKeys();

        return true;
    }

    handleSpeedOnChange(value) {
        this.scene.handleSpeedOnChange(value);
    }

    handleScaleOnChange(value) {
        this.scene.handleScaleOnChange(value);
    }

    handleAxisOnChange(enable) {
        this.scene.enableAxis(enable);
    }

    handleDevOnChange(enable) {
        /*if (enable) {
            //this.camera.setValue('Primitive Camera');
            this.setCamera('Primitive Camera');
        } else {
            //this.camera.setValue('Skybox Camera');
            this.setCamera('Skybox Camera');
        }*/

        this.scene.enableDev(enable);
    }

    handleCameraOnChange(cameraId) {
        let camera = this.scene.getCamera(cameraId);

        this.setActiveCamera(camera);
        this.scene.setCamera(camera);
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;
        // disable the processKeyboard function
        this.processKeyboard = function () {
        };
        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        switch (event.key) {
            case 's':
                this.scene.handleKeySDown();
                break;
            case 'w':
                this.scene.handleKeyWDown();
                break;
            case 'a':
                this.scene.handleKeyADown();
                break;
            case 'd':
                this.scene.handleKeyDDown();
                break;
            case 'r':
                this.scene.handleKeyRDown();
                break;
            case 'p':
                this.scene.handleKeyPDown();
                break;
            case 'l':
                this.scene.handleKeyLDown();
                break;
            default:
                break;
        }
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        switch (event.key) {
            case 's':
                this.scene.handleKeySUp();
                break;
            case 'w':
                this.scene.handleKeyWUp();
                break;
            case 'a':
                this.scene.handleKeyAUp();
                break;
            case 'd':
                this.scene.handleKeyDUp();
                break;
            case 'r':
                this.scene.handleKeyRUp();
                break;
            case 'p':
                this.scene.handleKeyPUp();
                break;
            case 'l':
                this.scene.handleKeyLUp();
                break;
            default:
                break;
        }
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };
}

export default MyInterface;