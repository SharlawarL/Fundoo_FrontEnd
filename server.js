const express = require('express');
const http= require('http')
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular'));

app.get('/*', (req,res) => res.sendFile(path.join(__dirname+'/dist/angular/index.html')));


const server = http.createServer(app);
// Start the app by listening on the default Heroku port
//app.listen(port);
server.listen(port,()=> console.log("Running on server..."))