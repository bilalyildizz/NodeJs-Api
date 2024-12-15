const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(express.json({message: 'Hello World FROM AUDIT LOGS'}));
});

module.exports = router;