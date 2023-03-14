const path = require('path');
const { nanoid } = require('nanoid');
const express = require('express');

const db = require(path.join(__dirname, '..', 'db'));

const router = express.Router();
module.exports = router;

router.post('/', (req, res) => {
    db.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('There was an error.', err);
            return res.json({ status: false, alias: null });
        } else {
            const o_id = 0;
            const link = req.body.link;
            const alias = nanoid(12);
            const track = true;
            const password = '';
            const views = 0;
            const enabled = true;
            const created_on = new Date().toISOString();

            return res.json({ status: true, alias });
        }
    });
});
