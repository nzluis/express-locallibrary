var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool/', (req, res) => {
  res.render('cool', { text: 'You are so cool'})
})

module.exports = router;
