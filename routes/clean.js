const path = require('path');
const { nanoid } = require('nanoid');
const express = require('express');

const db = require(path.join(__dirname, '..', 'db'));

const router = express.Router();
module.exports = router;

router.post('/', (req, res) => {
    const link = req.body.link;
    const o_id = 1;

    db.query(
        `SELECT * FROM links WHERE o_id = ${o_id} AND link = "${link}"`,
        (err, rows) => {
            if (err) {
                console.log(
                    'There was an error getting the links from the database.',
                    err,
                );
                return res.json({
                    status: false,
                    alias: null,
                    code: 'ERROR1',
                    message: err,
                });
            } else {
                if (rows.length > 0) {
                    return res.json({
                        status: true,
                        alias: rows[0].alias,
                        code: 'SUCCESS',
                        message: null,
                    });
                } else {
                    const alias = nanoid(12);
                    const track = true;
                    const password = '';
                    const views = 0;
                    const enabled = true;
                    const created_on = new Date().toISOString();

                    db.query(
                        `INSERT INTO links (o_id, link, alias, track, password, views, enabled, created_on) VALUES (${o_id}, "${link}", "${alias}", ${track}, "${password}", ${views}, ${enabled}, "${created_on}")`,
                        (err) => {
                            if (err) {
                                console.error(
                                    'There was an error creating the link in the database.',
                                    err,
                                );
                                return res.json({
                                    status: false,
                                    alias: null,
                                    code: 'ERROR2',
                                    message: err,
                                });
                            } else {
                                return res.json({
                                    status: true,
                                    alias,
                                    code: 'SUCCESS',
                                    message: null,
                                });
                            }
                        },
                    );
                }
            }
        },
    );
});
