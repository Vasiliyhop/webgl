var gm = require('./generalManager');
//............response object
exports.responseObject = {wrap:{}};
exports.main = function (){
    exports.responseObject.wrap.vShader = gm.wrapper.wrapShaderToSting('vshader','x-vertex', exports.responseObject.v_shader);
    exports.responseObject.wrap.fShader = gm.wrapper.wrapShaderToSting('fshader','x-fragment', exports.responseObject.f_shader);
    exports.responseObject.wrap.webgl_utils = gm.wrapper.wrapFuncToSting('', exports.responseObject.webgl_utils);
    var response = [
        exports.responseObject.wrap.htmlBegin,   // html header
        exports.responseObject.wrap.vShader,     // vertex shader         (body)
        exports.responseObject.wrap.fShader,     // fragment shader       (body)
        exports.responseObject.wrap.webgl_utils, // utils wefgl functions (body)
        exports.responseObject.wrap.mainFunc,    // main webgl function   (body)
        exports.responseObject.wrap.htmlEnd      // html end
    ].join('\n');
    gm.server(response);
}
//.............initialization
exports.init = function(){
    //..........canvas size
    var cWidth = gm.canvas_size.width;
    var cHeight = gm.canvas_size.height;
    //..........html header
    exports.responseObject.wrap.htmlBegin = "\
        <!DOCTYPE html>\
        <html>\
        <head>\
        <title>Basic-webgl</title>\
        </head>\
        <body style='margin:0px' onload='main()'>\
        <canvas id='webgl-canvas' \
        width='" + cWidth + "'\
         height='" + cHeight + "'\
          style='position: absolute;'></canvas>\
    ";
    //...........html end
    exports.responseObject.wrap.htmlEnd = "\
        </body></html>\
        ";
}
