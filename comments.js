// Create web server
// Start server: node comments.js
// Open browser: http://localhost:3000/comments.html

var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    comments = require('./comments.json'),
    port = 3000;

// Create server
http.createServer(function (req, res) {
    // Set headers
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    });

    // Determine request method
    if (req.method === 'POST') {
        // Handle post request
        var body = '';

        // Accumulate data
        req.on('data', function (data) {
            body += data;
        });

        // Handle post data
        req.on('end', function () {
            // Parse post data
            var post = qs.parse(body);

            // Add comment to comments array
            comments.push(post.comment);

            // Write comments array to file
            fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });

            // Send response
            res.end('Comment added!');
        });
    } else {
        // Handle get request
        // Send comments array to client
        res.end(JSON.stringify(comments));
    }
}).listen(port);

// Log port
console.log('Listening on port ' + port);