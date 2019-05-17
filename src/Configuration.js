export const TIME_OF_THE_DAY = {
    day: 'Day',
    night: 'Night'
};

export const IMAGE_PATH = 'img';
const OBJECTS_SCENE_SIZE_RATIO = 0.07;

// todo: cache cameras, textures here

let cameras = {
    'Skybox Camera': {
        fov: 1.4,
        near: 0.2,
        far: 5000,
        from: [50, 65, 100],
        to: [50, 65, 50]
    },
    'Skybox Camera 2': {
        fov: 1.4,
        near: 0.2,
        far: 5000,
        from: [50, 15, 100],
        to: [50, 15, 50]
    },
    'Primitive Camera': {
        fov: 0.4,
        near: 0.1,
        far: 500,
        from: [15, 15, 15],
        to: [0, 0, 0]
    },
    'God Camera': {
        fov: 0.7,
        near: 0.1,
        far: 500,
        from: [200, 200, 200],
        to: [0, 0, 0]
    }
};

let config = {
    cameras: cameras,
    default_camera: 'Skybox Camera 2',
    lights: {
        default: [
            {
                position: [15, 2, 5],
                ambient: [0.8, 0.8, 0.8, 0.5],
                diffuse: [0.5, 0.5, 0.5, 1],
                specular: [0.2, 0.2, 0.2, 1],
                enabled: false
            }
        ],
        day: [
            {
                position: [50, 100, 0],
                ambient: [1, 1, 204 / 255, 1],
                diffuse: [1, 1, 204 / 255, 1],
                specular: [0.2, 0.2, 0.2, 1],
                enabled: true
            }
        ],
        night: [
            {
                position: [50, 100, 0],
                ambient: [229 / 255, 229 / 255, 255 / 255, 1],
                diffuse: [229 / 255, 229 / 255, 255 / 255, 1],
                enabled: true
            },
            {
                position: [2, 4, 0],
                diffuse: [1, 1, 1, 1],
                specular: [0.2, 0.2, 0.2, 1],
                enabled: false
            }

        ],
    },
    skybox: {
        texture: {
            day: {
                top: IMAGE_PATH + '/skybox/day/top.jpg',
                bottom: IMAGE_PATH + '/skybox/day/bottom.jpg',
                left: IMAGE_PATH + '/skybox/day/left.jpg',
                right: IMAGE_PATH + '/skybox/day/right.jpg',
                front: IMAGE_PATH + '/skybox/day/front.jpg',
                back: IMAGE_PATH + '/skybox/day/back.jpg'
            },
            night: {
                top: IMAGE_PATH + '/skybox/night/top.jpg',
                bottom: IMAGE_PATH + '/skybox/night/bottom.jpg',
                left: IMAGE_PATH + '/skybox/night/left.jpg',
                right: IMAGE_PATH + '/skybox/night/right.jpg',
                front: IMAGE_PATH +  '/skybox/night/front.jpg',
                back: IMAGE_PATH +  '/skybox/night/back.jpg'
            }
        },
        material: {
            ambient: [0.9, 0.9, 0.9, 1],
            diffuse: [0.4, 0.4, 0.4, 1],
            specular: [0.2, 0.2, 0.2, 1]
        },
        scale: 100
    },
    default_time_of_the_day: TIME_OF_THE_DAY.day,
    hill1_levels: 4,
    hill2_levels: 3,
    tree: {
        trunk_texture: IMAGE_PATH + '/unit-cube/bottom.png',
        tree_top_texture: IMAGE_PATH + '/unit-cube/top.png'
    },
    enable_dev_objects: false,
    axis_enabled: true,
    default_appearance: {
        ambient: [0.7, 0.7, 0.7, 1.0],
        shininess: 10.0
    },
    unit_cube_quad: {
        texture: {
            side: IMAGE_PATH + '/unit-cube/side.png',
            top: IMAGE_PATH + '/unit-cube/top.png',
            bottom: IMAGE_PATH + '/unit-cube/bottom.png'
        }
    },
    default_global_ambient_light: [0.1, 0.1, 0.1, 1.0]
};

let instance;

export class Configuration {
    constructor () {
        this.timeOfTheDay = config['default_time_of_the_day'];
    }

    static getInstance() {
        if (!instance)
            instance = new Configuration();
        return instance
    }

    static getDefaultGlobalAmbient() {
        return config['default_global_ambient_light'];
    }

    static getObjectsScale() {
        return this.getSkyboxScale() * OBJECTS_SCENE_SIZE_RATIO;
    }

    static getCubeTopTexture() {
        return config['unit_cube_quad']['texture']['top'];
    }

    static getCubeSideTexture() {
        return config['unit_cube_quad']['texture']['side'];
    }

    static getCubeBottomTexture() {
        return config['unit_cube_quad']['texture']['bottom'];
    }

    setTimeOfTheDay(timeOfTheDay) {
        this.timeOfTheDay = timeOfTheDay;
    }

    getTimeOfTheDay() {
        return this.timeOfTheDay;
    }

    setNight() {
        this.timeOfTheDay = TIME_OF_THE_DAY.night;
    }

    setDay() {
        this.timeOfTheDay = TIME_OF_THE_DAY.day;
    }

    static getCamerasIds() {
        return Object.keys(config['cameras']);
    }

    static getDefaultCameraId() {
        return config['default_camera'];
    }

    getDefaultCamera() {
        let id = config['default_camera'];

        return this.getCamera(id);
    }

    getLights() {
        let defaultLights, dayLights, nightLights;

        defaultLights = config['lights']['default'];
        dayLights = config['lights']['day'];
        nightLights = config['lights']['night'];

        let day = this.getTimeOfTheDay();

        switch (this.getTimeOfTheDay()) {
            case TIME_OF_THE_DAY.day:
                if (! dayLights) return defaultLights;
                return defaultLights.concat(dayLights);
            case TIME_OF_THE_DAY.night:
                if (! nightLights) return nightLights;
                return defaultLights.concat(nightLights);
            default:
                console.assert(true, 'Invalid time of the day option.');
                break;
        }
    }

    static getSkyboxConfig() {
        return config['skybox'];
    }

    static getSkyboxScale() {
        return config['skybox']['scale'];
    }

    static getDefaultTimeOfTheDay() {
        return config['default_time_of_the_day'];
    }

    static getSkyBoxDayTexture() {
        return config['skybox']['texture']['day'];
    }

    static getSkyBoxNightTexture() {
        return config['skybox']['texture']['night'];
    }

    static getTrunkTexture() {
        return config['tree']['trunk_texture'];
    }

    static getTreeTopTexture() {
        return config['tree']['tree_top_texture'];
    }

    static enableDevObjects() {
        config['enable_dev_objects'] = true;
    }

    static disableDevObjects() {
        config['enable_dev_objects'] = false;
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

    static isDevObjectsEnabled() {
        return config['enable_dev_objects'] === true;
    }

    static isAxisEnabled() {
        return config['axis_enabled'] === true;
    }

    static getDefaultAppearance() {
        return config['default_appearance'];
    }

    static getHillsLevels() {
        let hill1_level = config['hill1_levels'];
        let hill2_level = config['hill2_levels'];

        return [hill1_level, hill2_level];
    }
}