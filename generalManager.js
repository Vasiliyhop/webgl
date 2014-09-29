exports.http = require('http');
//.............html canvas default options
exports.canvas_size = {};
exports.canvas_size.width = 400;
exports.canvas_size.height = 400;
htmlTemplate = require('./htmlTemplate.js');
//.............htmlTemplate
exports.responseObject = htmlTemplate.responseObject;
//.............html exports
var main = htmlTemplate.main;
//.............load queue
exports.loadingFlag = 0;
exports.loadDataFromFile = function(fileName, callback){
    fs = require('fs');
    exports.loadingFlag++;
    fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        exports.loadingFlag--;
        callback(data);
        if(exports.loadingFlag == 0){
            exports.init();
            main();
        }
    });
}
//..........wrappers
exports.wrapper = {
    wrapFuncToSting: function (funcName, func){
        var str = '';
        if (funcName != ''){
            str = '<script> var ' + funcName + " = ";
        }else{
            str = '<script>';
        };
        return (str + func + ' </script>');
    },
    wrapShaderToSting: function(shaderName, type, source ){
        var str = "<script id='" + shaderName + "' type='x-shader/" + type + "'>";
        source = source.replace(/{/g, '{\n');
        source = source.split(';').join(';\n');
        return (str + source + "</script>");
    }
}
//...............server default options
exports.ipadress = 'http://localhost';
exports.ip = '127.0.0.1';
exports.port = 8000;
//...............server
exports.exitWhenServerResponseFlag = false;
exports.server = function(response){
    this.http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(response);
        res.end();
        if(exports.exitWhenServerResponseFlag) process.exit(1);
    }).listen(exports.port, exports.ip);
    console.log('Server running at http://' + exports.ip +':' + exports.port);
}
//.............browser settings
exports.openBrowser = false;
var browserArgs;
//.............exec run
exports.exec = function(){
    var exec = require('child_process').exec;

    function my_exec(command, callback) {
        var proc = exec(command);

        var list = [];
        proc.stdout.setEncoding('utf8');

        proc.stdout.on('data', function (chunk) {
            list.push(chunk);
        });

        proc.stdout.on('end', function () {
            callback(list.join());
        });
    }
    my_exec('killall webglBrowser', function (stdout) {
        console.log(stdout);
        my_exec('open webglBrowser.app' + browserArgs, function (stdout) {
            console.log(stdout);
        })
    });
}
//..............init
exports.init = function(){
    //open 'webglBrovser.app' --args ipadress=http://localhost port=8000 width=800 height=800
    browserArgs = ' --args ipadress=' + exports.ipadress + ' port=' + exports.port + ' width=' + exports.canvas_size.width + ' height=' + exports.canvas_size.height;
    // httpTemplate init
    htmlTemplate.init();
    main = htmlTemplate.main;
    if (exports.openBrowser) {exports.exec();}
}
