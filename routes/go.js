const path = require('path');
const express = require('express');

const db = require(path.join(__dirname, '..', 'db'));

const router = express.Router();
module.exports = router;

router.get('/:alias', (req, res) => {
    const alias = req.params.alias;

    db.query(`SELECT * FROM links WHERE alias = "${alias}"`, (err, rows) => {
        if (err) {
            const message =
                'There was an error getting the link from the database.';
            console.error(`${message}`, err);
            return res.render('error', {
                message,
                err,
            });
        } else {
            if (rows.length > 0) {
                const link = rows[0].link;
                return res.redirect(link);
            } else {
                return res.redirect('/');
            }
        }
    });
});
