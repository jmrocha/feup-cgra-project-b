export const IMAGE_PATH = 'img';
const OBJECTS_SCENE_SIZE_RATIO = 0.07;

let config = {
    cameras: {
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
    },
    default_camera: 'Primitive Camera',
    lights: {
        default: [
            {
                position: [50, 100, 0, 1],
                ambient: [1, 1, 204 / 255, 1],
                diffuse: [1, 1, 204 / 255, 1],
                specular: [0.2, 0.2, 0.2, 1],
                enabled: true
            }
        ],
        dev: [
            {
                position: [15, 2, 5, 1],
                diffuse: [1.0, 1.0, 1.0, 1.0],
                enabled: true
            }
        ]
    },
    skybox: {
        texture: {
            top: IMAGE_PATH + '/skybox/day/top.jpg',
            bottom: IMAGE_PATH + '/skybox/day/bottom.jpg',
            left: IMAGE_PATH + '/skybox/day/left.jpg',
            right: IMAGE_PATH + '/skybox/day/right.jpg',
            front: IMAGE_PATH + '/skybox/day/front.jpg',
            back: IMAGE_PATH + '/skybox/day/back.jpg'
        },
        material: {
            ambient: [0.9, 0.9, 0.9, 1],
            diffuse: [0.4, 0.4, 0.4, 1],
            specular: [0.2, 0.2, 0.2, 1]
        },
        scale: 100
    },
    tree: {
        trunk_texture: IMAGE_PATH + '/unit-cube/bottom.png',
        tree_top_texture: IMAGE_PATH + '/unit-cube/top.png'
    },
    enable_dev_objects: false,
    axis_enabled: true,
    default_appearance: {
        ambient: [0.2, 0.4, 0.8, 1.0],
        diffuse: [0.2, 0.4, 0.8, 1.0],
        specular: [0.2, 0.4, 0.8, 1.0],
        shininess: 10.0
    },
    unit_cube_quad: {
        texture: {
            side: IMAGE_PATH + '/unit-cube/side.png',
            top: IMAGE_PATH + '/unit-cube/top.png',
            bottom: IMAGE_PATH + '/unit-cube/bottom.png'
        }
    },
    default_global_ambient_light: [0.1, 0.1, 0.1, 1.0],
    bird: {
        flutter_velocity: 1,
        velocity: 1 / 500,
        rotation: 15
    }
};

export default config;