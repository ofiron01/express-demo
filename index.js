const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookAPI');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

var router = express.Router();
router.use('/books', require('./src/routes/books'));
router.use('/api', require('./src/routes/api'));
router.use('/', require('./src/routes/pages'));
app.use(router);



const onServerStarted = () => {
    console.log(`express running on port: ${server.address().port}`);
}

let port = process.env.PORT || 3005;
let server = app.listen(port, onServerStarted);