console.log('HANDLER: Line 1');

// These headers will allow Cross-Origin Resource Sharing (CORS).
var header = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json',
};

var requestHandler = function(req, res) {
  console.log(`HANDLER: request-type: ${req.method} url: ${req.url}`);

  // The outgoing status.
  var statusCode = 200;

  res.writeHead(statusCode, headers);

  res.end('Hello, World!');
};

exports.requestHandler = requestHandler;
