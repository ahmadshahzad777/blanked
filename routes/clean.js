const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/', (req, res) => {
    return res.json({ status: true });
});
