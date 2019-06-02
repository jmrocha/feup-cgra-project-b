export const IMAGE_PATH = 'img';
export const SHADER_PATH = 'glsl';
const OBJECTS_SCENE_SIZE_RATIO = 0.07;

let config = {
    cameras: {
        'Skybox Camera': {
            fov: 0.8,
            near: 0.2,
            far: 5000,
            from: [25, 8, -1],
            to: [0, 0, 0]
        },
        'Skybox Camera 2': {
            fov: 0.4,
            near: 0.1,
            far: 500,
            from: [25, 25, 25],
            to: [0, 0, 0]
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
            from: [25, 25, 25],
            to: [0, 0, 0]
        }
    },
    default_camera: 'Skybox Camera',
    lights: {
        default: [
            {
                position: [50, 100, 0, 1],
                ambient: [1, 1, 204 / 255, 1],
                diffuse: [1, 1, 204 / 255, 1],
                specular: [0.2, 0.2, 0.2, 1],
                enabled: true
            },
            {
                position: [0, 1, 0, 1],
                diffuse: [1.0, 1.0, 1.0, 1.0],
                visible: true,
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
    shader:{
       vert: SHADER_PATH + '/terrain.vert',
       frag: SHADER_PATH + '/terrain.frag'
    },
    terrain:{
        texture:{
            terrain: IMAGE_PATH + '/terrain.jpg',
            height_map: IMAGE_PATH + '/heightmap2.jpg',
            altimetry: IMAGE_PATH + '/altimetry2.png'
        }
    },
    skybox: {
        texture: {
            top: IMAGE_PATH + '/skybox/night/top.jpg',
            bottom: IMAGE_PATH + '/skybox/night/bottom.jpg',
            left: IMAGE_PATH + '/skybox/night/left.jpg',
            right: IMAGE_PATH + '/skybox/night/right.jpg',
            front: IMAGE_PATH + '/skybox/night/front.jpg',
            back: IMAGE_PATH + '/skybox/night/back.jpg'
        },
        material: {
            ambient: [0.9, 0.9, 0.9, 1],
            diffuse: [0.4, 0.4, 0.4, 1],
            specular: [0.2, 0.2, 0.2, 1]
        },
        scale: 35
    },
    tree: {
        trunk_texture: IMAGE_PATH + '/unit-cube/bottom.png',
        tree_top_texture: IMAGE_PATH + '/unit-cube/top.png'
    },
    enable_dev_objects: false,
    axis_enabled: false,
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