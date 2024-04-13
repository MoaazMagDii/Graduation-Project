const express = require("express");
const router = express.Router();

const adminController = require(".././Controllers/adminController");


router.post('/newAdmin', adminController.newAdmin);

router.get('/allUsers', adminController.getAllUsers);

router.patch('/updateBalance', adminController.updateBalance);

router.post('/addUser', adminController.addUser);
router.delete('/deleteUser', adminController.deleteUser);


module.exports = router;
