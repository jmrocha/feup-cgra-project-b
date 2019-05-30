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

    static distance(p1, p2) {
        let dx = Math.pow(p1[0] - p2[0], 2);
        let dy = Math.pow(p1[1] - p2[1], 2);
        let dz = Math.pow(p1[2] - p2[2], 2);

        return Math.sqrt(dx + dy + dz);
    }
}

export default Utils;