const express = require('express');
const router = express.Router();
const passport = require('passport');
const Book = require('../models/Book');
const {addNewUser, getUserByUserName} = require('../models/User');

router.get('/get', (req, res) => {
    Book.find((err, books) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.json(books);
    });
});

router.get('/get/:bookId', (req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.json(book);
    });
});

router.post('/signup', (req, res) => {

    getUserByUserName(req.body.username).then((user) => {
        if (user) {
            return res.status(400).json({error: 'user already exists'});
        }
        // Create user
        addNewUser(req.body).then((newUser) => {
            req.login(newUser, () => {
                res.redirect('/api/profile');
            });
        });
    });
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

module.exports = router;