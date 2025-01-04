var express = require('express');
var router = express.Router();

const fs = require('fs');
// eslint-disable-next-line no-undef
const routes = fs.readdirSync(__dirname);

routes.forEach(route => {
    if(route !== 'index.js' && route.includes('.js')){
        router.use(`/${route.replace('.js', '')}`, require(`./${route}`));
    }
});


module.exports = router;
