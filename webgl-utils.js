window.onerror = function(msg, url, lineno) {
    alert(url + '(' + lineno + ') : ' + msg);
}
//...........webgl context
var canvas = document.getElementById('webgl-canvas');
var gl = canvas.getContext('experimental-webgl');

function createShader(source, type){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(shader);
    }
    return shader;
}
function createProgram(vs_source, fs_source){
    var program = gl.createProgram();
    var vshader = createShader(vs_source, gl.VERTEX_SHADER);
    var fshader = createShader(fs_source, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(program);
    }
    return program;
}
