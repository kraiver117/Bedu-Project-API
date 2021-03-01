var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to eCommerce api');
})
//routes
router.use('/users', require('./user'));
router.use('/product', require('./product'));
router.use('/order', require('./order'));

module.exports = router;