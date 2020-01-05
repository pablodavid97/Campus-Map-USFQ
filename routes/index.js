const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const key = process.env.GOOGLE_MAPS_KEY;

    res.render('index', {key: key});
});

module.exports = router;