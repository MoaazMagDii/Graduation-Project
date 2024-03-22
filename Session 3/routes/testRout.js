const express = require('express');
const router = express.Router();
const testRouter = require('.././Controllers/test')




router.route('/test').get(testRouter.test1)


module.exports = router;