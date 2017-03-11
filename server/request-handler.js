console.log('HANDLER: Line 1');

// These headers will allow Cross-Origin Resource Sharing (CORS).
var header = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json',
};

var idCounter = 1;
var messages = [];

var action = {
  GET: function(req, res) {
    res.writeHead(200, header);
    res.end(JSON.stringify({results: messages}));
  },

  POST: function(req, res) {
    req.on('data', function(data) {
      data = JSON.parse(data);
      data.objectId = ++idCounter;
      messages.push(data);
    });

    req.on('end', function() {
      res.writeHead(201, header);
      res.end(JSON.stringify({results: messages}));
    });
  },

  OPTIONS: function(req, res) {
    res.writeHead(200, header);
    res.end(JSON.stringify({results: messages}));
  },

  ERROR: function(req, res) {
    res.writeHead(404, header);
    res.end('404 Not found');
  },
};

var requestHandler = function(req, res) {
  console.log(`HANDLER: request-type: ${req.method} url: ${req.url}`);

  if (req.url.indexOf('/classes/messages') > -1) {
    action[req.method](req, res);
  } else {
    action.ERROR(req, res);
  }
};

exports.requestHandler = requestHandler;
