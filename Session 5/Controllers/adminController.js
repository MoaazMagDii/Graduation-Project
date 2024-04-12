const User = require(".././Models/userModel");
const PurchasedStock = require(".././Models/purchasedStockModel");
const Transaction = require(".././Models/TransactionModel");
const Logs = require(".././Models/logsModel");
const Admin = require(".././Models/adminModel");

exports.newAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: newAdmin,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(200).json({
      status: "success",
      data: { newUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      status: "success",
      results: allUsers.length,
      data: { allUsers },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const update = { balance: req.body.balance };

    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    await User.findOneAndDelete(filter);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};
