require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan'); // for logs
const path = require('path');
var cookieParser = require('cookie-parser'); // for parse cookies


// services
const WssService = require('./services/wss.service');
const MongoDBService = require('./services/mongodb.service.js');

const router = require('./routes/index');
const PORT = process.env.PORT || 3001;


const app = express();

MongoDBService.connect();

app.use(morgan('dev'));
// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
router(app);

const server = http.createServer(app);
WssService.init(server);
server.listen(PORT, () => console.log(`Server running and listen, ${PORT} port! `));

module.exports = app;
