var gm = require('./generalManager');

// browser and serwer settings
gm.canvas_size.width = 600;
gm.canvas_size.height = 600;
gm.ipadress = 'http://localhost';
gm.ip = '127.0.0.1';
gm.port = 8000;
gm.exitWhenServerResponseFlag = true;
gm.openBrowser = true;
// components loading
gm.loadDataFromFile('./vertex-shader.vert', function(data){
    gm.responseObject.v_shader = data;
});
gm.loadDataFromFile('./fragment-shader.frag', function(data){
    gm.responseObject.f_shader = data;
});
gm.loadDataFromFile('./webgl-utils.js', function(data){
    gm.responseObject.webgl_utils = data;
});

//............main webgl script
gm.responseObject.wrap.mainFunc = gm.wrapper.wrapFuncToSting('main',function() {
    //..................object init
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    var vertices = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPosBuffer.itemSize = 2;
    vertexPosBuffer.numItems = 4;
    var offset = [-0.5, 0.0];
    var scale = 10.0;

    var vertexShaderSource = document.getElementById('vshader').text;
    var fragmentShaderSource = document.getElementById('fshader').text;

    var program = createProgram(vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    program.vertexPosAttrib = gl.getAttribLocation(program, 'aVertexPosition');
    program.canvasSizeUniform = gl.getUniformLocation(program, 'uCanvasSize');
    program.offsetUniform = gl.getUniformLocation(program, 'uOffset');
    program.scaleUniform = gl.getUniformLocation(program, 'uScale');
    gl.enableVertexAttribArray(program.vertexPosArray);
    gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, false, 0, 0);
    var d_scale = scale;
    var d_offset = offset;
    var d_factor = 1.005;
    //       draw >>>
    function draw() {
        d_scale /= d_factor;
        if (d_scale < 0.00001){
            d_factor = 1.0 / d_factor;
            d_scale = 0.00001
        }
        if (d_scale > scale){
            d_factor = 1.0 / d_factor;
            d_scale = scale;
        }
        if (d_offset[0] < 0.140){
            d_offset[0] += 0.000601;
            d_offset[1] += 0.0006;
        }
        gl.uniform2f(program.canvasSizeUniform, canvas.width, canvas.height);
        gl.uniform2f(program.offsetUniform, d_offset[0], d_offset[1]);
        gl.uniform1f(program.scaleUniform, d_scale);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
        window.requestAnimationFrame(draw);
    }
    draw();
});
