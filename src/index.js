import MyScene from "./MyScene.js";
import MyInterface from "./MyInterface.js";

window.onload = () => {
    let app = new CGFapplication(document.body);
    let myScene = new MyScene();
    let myInterface = new MyInterface();

    app.init();
    app.setScene(myScene);
    app.setInterface(myInterface);
    myInterface.setActiveCamera(myScene.camera);
    app.run();
};