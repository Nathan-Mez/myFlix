
/* import the built-in modules http, fs and url*/
const http = require('http'),
        fs = require('fs'),        //for managing file input and output
       url = require('url');       /*to split (parse) web address to readable parts,
                                        In this case, USED ONLY to see if "pathname" component of the URL has "documentation" property*/


http.createServer((request, response) => {
  let addr = request.url,                 //assign addr to user-generated url straight from the request object (from the createserver() argument)
         q = url.parse(addr, true),       //In the URL object, each component (host, pathname, search) now has properties
  filePath = '';


/*If url contains "documentation" return "documentation.html" to user
                             else retrun "index.html to user"*/
  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
    }
  else {
        filePath = 'index.html';
      }


 //appends user-generated URL and it's request time to "log.txt" file
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(addr + 'Added to log.');          //"URL Added to log." displayed if appendFile is success
    }
  });


  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
    console.log('data: ', data);
  });

}).listen(8080);

console.log('Server running on port 8080');
