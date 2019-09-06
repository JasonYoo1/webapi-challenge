const express = require('express');
const projectRouter = require('./project/projectRouter');


const server = express();

server.use(express.json());
server.use('/projects', projectRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Initial Commit</h2>`);
});


function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
};


module.exports = server;