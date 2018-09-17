const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('index');

});

router.get('/signup', (req, res) => {

    res.render('signup', {
        title: 'Sign up'
    });

});


router.get('/signin', (req, res) => {

    res.render('signin', {
        title: 'Sign in!'
    });

});

router.get('/profile', (req, res) => {
    res.json(req.user);
})

module.exports = router;