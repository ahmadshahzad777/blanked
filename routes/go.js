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
                const row = rows[0];
                const id = row.id;
                const link = row.link;
                const views = row.views + 1;
                const enabled = row.enabled;

                if (enabled) {
                    db.query(
                        `UPDATE links SET views = ${views} WHERE id = ${id}`,
                        (err) => {
                            if (err) {
                                const message =
                                    "There was an error updating the link's view count.";
                                console.error(`${message}`, err);
                                return res.render('error', { message, err });
                            } else {
                                return res.redirect(link);
                            }
                        },
                    );
                } else {
                    return res.redirect('/');
                }
            } else {
                return res.redirect('/');
            }
        }
    });
});
