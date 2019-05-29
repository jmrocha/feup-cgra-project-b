import MyLSystem from "./MyLSystem.js";
import MyLightningBranch from "./MyLightningBranch";


class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene.addObserver(this);

        this.axiom = "X";
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;


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


        this.deltaTime;
        this.elapsedTime;
        this.depth = 300;
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
        if (this.isBeingAnimated && this.elapsedTime <= 1000){
            this.depth++;
        }
    }

    flash(){
        if (!this.isBeingAnimated){
            this.isBeingAnimated = true;
            this.startAnimation();
        }
    }

    stopFlash(){
        if (this.isBeingAnimated){
            this.isBeingAnimated = false;
            this.stopAnimation();
        }
    }

    startAnimation(){
        this.elapsedTime = 0;
        //this.depth = 300;
        super.iterate();
    }

    stopAnimation(){
        this.depth = 300;
        this.elapsedTime = 0;
    }

    display() {
        this.scene.pushMatrix();
        console.log(this.depth);
        this.scene.scale(this.scale, this.scale, this.scale);

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

                    if (primitive && (i < this.depth)) {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }

}

export default MyLightning;