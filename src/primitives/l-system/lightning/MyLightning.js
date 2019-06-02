import MyLSystem from "../MyLSystem.js";
import MyLightningBranch from "./MyLightningBranch.js";
import Utils from "../../../Utils.js";

const ANIMATION_DURATION = 1000; // in ms

class MyLightning extends MyLSystem {
    constructor(scene, position = [0, 0, 0], orientation = 0) {
        super(scene);
        this.scene.addObserver(this);

        this.axiom = "X";
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
        this.position = position;
        this.orientation = Utils.degToRad(orientation);


        super.generate(
            this.axiom,
            {
                "F": [ "FF" ],
                "X": ["F[-X][X]F[-X]+FX" ]
            },
            this.angle,
            this.iterations,
            this.scaleFactor
        );


        this.isBeingAnimated = false;
    }

    initGrammar() {
        this.grammar = {
            "F": new MyLightningBranch(this.scene),
            "X": new MyLightningBranch(this.scene)
        }
    }


    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.elapsedTime += this.deltaTime;

        this.updateDepth();
    }

    updateDepth() {
        if (!this.isBeingAnimated) return;
        if (this.elapsedTime >= ANIMATION_DURATION) {
            this.isBeingAnimated = false;
            this.depth = 0;
            return;
        }

        let v = this.axiom.length / ANIMATION_DURATION;

        this.depth += v * this.deltaTime;
    }

    flash(){
        if (this.isBeingAnimated === false){
            this.isBeingAnimated = true;
            this.startAnimation();
        }
    }

    stopFlash(){
        //if (this.isBeingAnimated == true){
        //    this.isBeingAnimated = false;
        //    this.stopAnimation();
        //}
    }

    startAnimation(){
        this.elapsedTime = 0;
        this.depth = 0;
        //super.iterate();
    }

    stopAnimation(){
        this.depth = 0;
        this.elapsedTime = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.scene.rotate(160,0,0,1);

        var i;

        // percorre a cadeia de caracteres
        for (i = 0; i < this.axiom.length; ++i) {

            // verifica se sao caracteres especiais
            switch (this.axiom[i]) {
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                case "\\":

                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":

                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":

                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":

                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive = this.grammar[this.axiom[i]];

                    if (primitive) {
                        if (i < this.depth){
                            primitive.display();
                            this.scene.translate(0, 1, 0);
                        }
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }

}

export default MyLightning;