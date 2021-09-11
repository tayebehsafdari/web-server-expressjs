const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("Local middleware");
    next();
}, (req, res) => {
    // res.send('Hello World!');
    // res.sendFile(__dirname + "/views/index.ejs");
    // res.sendFile(path.join(__dirname, "../views/index.ejs"));
    let title = 'Hello World!';
    let list = [
        'item 01',
        'item 02',
        'item 03',
    ];
    res.cookie('name', 'Tayebeh Safdari Doost', {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true});
    if (req.session.views) {
        req.session.views += 1;
    } else {
        req.session.views = 1;
    }
    console.log("req.session", req.session.views);
    res.render('index', {title, list});
});

router.get('/about', (req, res) => {
    res.render('about/index');
    // res.sendFile(path.join(__dirname, "../views/about/index.ejs"));
    // console.log(req.body);
    console.log("req.cookies", req.cookies);
});

/* router.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, "views/contact-us.html"));
}); */

router.route('/contact-us')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "../views/contact-us.html"));
    })
    .post((req, res) => {
        res.send("This is a post request.");
        // console.log(req.body);
    })
    .delete((req, res) => {
        res.send("This is a delete request.");
    })
    .patch((req, res) => {
        res.send("This is a patch request.");
    })
    .put((req, res) => {
        res.send("This is a put request.");
    });

router.get('/articles/:id', (req, res) => {
    res.sendFile(path.join(__dirname, `../views/articles/${req.params.id}.html`));
});

/* app.get('/articles/:id', (req, res) => {
    res.sendFile(path.join(__dirname, `views/articles/${req.params.id}.html`));
}); */

module.exports = router;