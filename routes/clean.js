const path = require('path');
const express = require('express');

const db = require(path.join(__dirname, '..', 'db'));

const router = express.Router();
module.exports = router;

router.post('/', (req, res) => {
    db.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('There was an error.', err);
            return res.json({ status: false, link: null });
        } else {
            const { link } = req.body;
            return res.json({ status: true, link });
        }
    });
});
