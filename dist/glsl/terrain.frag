#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D gradient;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 height = texture2D(uSampler2,vTextureCoord);
    vec2 pos = vec2(0.0,1.0 - height.r);
    vec4 gradientC = texture2D(gradient,pos);


    gl_FragColor = gradientC * color;
}