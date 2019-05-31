import Plane from "../Plane.js";
import config from "../Configuration.js";
import Utils from "../Utils.js";

class MyTerrain extends CGFobject {
    constructor(scene, texturePath) {
        super(scene);

        this.terrain = new Plane(scene, 32);
        this.material = new CGFappearance(scene);
        this.heightMap = new CGFtexture(scene, config['terrain']['texture']['height_map']);
        this.terrainTex = new CGFtexture(scene, texturePath);
        this.gradient = new CGFtexture(scene, config['terrain']['texture']['altimetry']);
        this.terrainShader = new CGFshader(scene.gl ,config['shader']['vert'], config['shader']['frag']);
        this.terrainShader.setUniformsValues({uSampler: 0});
        this.terrainShader.setUniformsValues({uSampler2: 1});
        this.terrainShader.setUniformsValues({gradient: 2});
        this.material.setTexture(this.texture);
    }

    display() {
        this.material.apply();
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTex.bind(0);
        this.heightMap.bind(1);
        this.gradient.bind(2);

        this.scene.pushMatrix();
        {
            this.scene.rotate(Utils.degToRad(-90), 1, 0, 0);
            this.scene.scale(20, 20, 1);
            this.terrain.display();
        }
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

export default MyTerrain;