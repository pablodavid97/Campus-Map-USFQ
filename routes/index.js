const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const key = process.env.GOOGLE_MAPS_KEY;
    const env = process.env.NODE_ENV;

    if(env !== 'development'){
        env = undefined
    }
    console.log("env", env);
    
    res.render('index', {key: key, env: env});
});

module.exports = router;