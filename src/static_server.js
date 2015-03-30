/**
 * Created by gideonbar on 30/03/15.
 */


var ssl_path = 'keys/hacksparrow-key.pem';
var cert_path = 'keys/hacksparrow-cert.pem';

var url = require("url");
var path = require("path");
var fs = require("fs");


var cfg = {
    ssl: true,
    port: 8888,
    ssl_key: ssl_path,
    ssl_cert: cert_path
};

var httpServer = ( cfg.ssl ) ? require('https') : require('http');



var processRequest = function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += 'client/html/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;

      if(cfg.ssl)
      {
          headers["ssl"] = "true";
      }
      else
      {
          headers["ssl"] = "false";
      }

      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
};


if (cfg.ssl)
{

    httpServer.createServer({

        // providing server with  SSL key/cert
        key: fs.readFileSync( cfg.ssl_key ),
        cert: fs.readFileSync( cfg.ssl_cert )

    }, processRequest ).listen(cfg.port, 10);

    console.log("Secure Static file server running at\n  => https://localhost:" + cfg.port + "/\nCTRL + C to shutdown");
}
else
{
    httpServer.createServer(processRequest).listen(parseInt(cfg.port, 10));

    console.log("Static file server running at\n  => http://localhost:" + cfg.port + "/\nCTRL + C to shutdown");
}

