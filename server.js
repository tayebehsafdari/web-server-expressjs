const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
// const querystring = require('querystring');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


app.set('views', './views');
app.set('view engine', 'ejs');

// app.use((req, res) => res.end('Hello World!'));

app.use(cookieParser());

// var fileStoreOptions = {};

var sess = {
    store: new FileStore({}),
    secret: '74Y383H54FD4R!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 5
    }
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use((req, res, next) => {
    console.log("Global middleware");
    next();
});

/* app.use((req, res, next) => {
    let body = '';
    req.on('data', data => {
        body += data;
    });
    req.on('end', () => {
        // console.log(querystring.parse(body));
        req.body = querystring.parse(body);
        next();
    });
}); */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'));

app.use(methodOverride(function (req, res) {
    console.log("delete req.body", req.body._method);
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    // res.status(404).send("not found");
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});