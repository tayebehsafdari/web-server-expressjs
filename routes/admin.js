const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is an admin route.");
});

module.exports = router;