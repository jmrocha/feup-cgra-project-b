class Utils {
    static degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    static getRand(min, max) {
        return (Math.random() * max) + min;
    }

    static printTexCoords(texCoords) {
        for (let i = 0; i < texCoords.length; i += 2)
            console.log(`${texCoords[i]}, ${texCoords[(i + 1) % texCoords.length]}`);
    }

    static printVertices(vertices) {
        for (let i = 0; i < vertices.length; i += 3) {
            let v1 = Math.round(vertices[i]);
            let v2 = Math.round(vertices[i + 1]);
            let v3 = Math.round(vertices[(i + 2) % vertices.length]);
            console.log(`${v1}, ${v2}, ${v3}`);
        }
    }
}

export default Utils;