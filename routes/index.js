var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to eCommerce api');
})
//routes
router.use('/users', require('./user'));
router.use('/products', require('./product'));
router.use('/orders', require('./order'));

module.exports = router;