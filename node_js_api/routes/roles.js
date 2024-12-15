const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(express.json({message: 'Hello World FROM ROLES'}));
});

module.exports = router;