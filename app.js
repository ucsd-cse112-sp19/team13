const http = require('http');
// handles reading files from filesystem
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// reads a file  given a specified path
// This is a way to send assets like javascript and css files
// without using easier methods provided by nodejs frameworks
// like Express.js
// Needs to read synchronosuly so that packet sends after we have
// read the entire file.
function read(strPath) {
  let contents = '';
  contents = fs.readFileSync(strPath, 'utf8');
  return contents;
}

// serves up the requested files
// only able to serve result.html and all files ending in .js inside
// test directory
http.createServer((req, res) => {
  // checks if the incoming request is for a test file
  // by checking if url is asking for the test directory
  // and from in there for a file ending in .js
  const isTestFile = (req.url).startsWith('/test/') && (req.url).endsWith('.js');
  // handle sending back test files ending in .js
  if (isTestFile) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    res.write(read('test/core-hello.js'));
    res.end();
  } else if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(read('test/result.html'));
    res.end();
  }
}).listen(port, hostname, () => {
  // console.log(`Server running at http://${hostname}:${port}/`);
});
