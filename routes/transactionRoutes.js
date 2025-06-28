const express = require('express');
const router = express.Router();
// You can leave this empty for now or add basic route

router.get('/test', (req, res) => {
  res.send('Transactions route working');
});

module.exports = router; 
