const express = require("express");
const router = express.Router();

const userController = require(".././Controllers/userController");
const authController = require('.././Controllers/authController');


router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/buy', userController.buy);
router.post('/sell', userController.sell);

router.get('/purchasedStock', userController.getPurchasedStock);
router.get('/transactions', userController.getTransactions);
router.get('/logs', userController.getLogs);
router.get('/info', userController.getUserInfo);

router.patch('/updateName', userController.updateName);
router.patch('/updatePassword', userController.updatePassword);

router.delete('/delete',userController.delete);


module.exports = router;
