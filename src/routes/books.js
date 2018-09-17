const express = require('express');
const router = express.Router();
const Book = require('../models/Book')

router.get('/', (req, res) => {

    Book.find((err, books) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.render('books', {
            title: 'my-books',
            books
        })
    });
});

router.get('/:id', (req, res) => {

    Book.findById(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.render('book', {
            book
        })
    });
});

module.exports = router;