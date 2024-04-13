const User = require(".././Models/userModel");
const PurchasedStock = require(".././Models/purchasedStockModel");
const Transaction = require(".././Models/TransactionModel");
const Logs = require(".././Models/logsModel");

exports.buy = async (req, res) => {
  try {
    const userId = req.body.id;
    const companyName = req.body.companyName;
    const tickerName = req.body.tickerName;
    const shares = req.body.shares;
    const investment = req.body.investment;
    //const {companyName, tickerName, shares, investment} = req.body;

    const user = await User.findById(userId);
    const filter = { userId: userId, tickerName: tickerName };
    const found = await PurchasedStock.findOne(filter);
    

    if (investment > user.balance) {
      return res.status(400).json({ message: "Not enough funds!" });
    }

    if (found == null) {
      await PurchasedStock.create({
        userId: userId,
        companyName: companyName,
        tickerName: tickerName,
        shares: shares,
        investment: investment,
      });
    } else {
      const newShares = found.shares + shares;
      const newInvestment = found.investment + investment;

      await PurchasedStock.findOneAndUpdate(
        filter,
        { shares: newShares, investment: newInvestment },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    const newBalance = user.balance - investment;

    await User.findOneAndUpdate(
      { _id: userId },
      { balance: newBalance },
      {
        new: true,
        runValidators: true,
      }
    );

    const newTransaction = await Transaction.create({
      userId: userId,
      transactionType: "BUY",
      companyName: companyName,
      tickerName: tickerName,
      shares: shares,
      investment: investment,
    });

    res.status(200).json({
      status: "success",
      data: { newTransaction },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.sell = async (req, res) => {
  try {
    const userId = req.body.id;
    const companyName = req.body.companyName;
    const tickerName = req.body.tickerName;
    const shares = req.body.shares;
    const investment = req.body.investment;
    //const {companyName, tickerName, shares, investment} = req.body;

    const user = await User.findById(userId);
    const filter = { userId: userId, tickerName: tickerName };
    const found = await PurchasedStock.findOne(filter);
    

    if (shares > found.shares) {
      return res.status(400).json({ message: "Not enough shares!" });
    }

    if (shares == found.shares) {
      await PurchasedStock.findOneAndDelete(filter);
    } else{
      const newShares = found.shares - shares;
      const newInvestment = found.investment - investment;

      await PurchasedStock.findOneAndUpdate(
        filter,
        { shares: newShares, investment: newInvestment },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    const newBalance = user.balance + investment;

    await User.findOneAndUpdate(
      { _id: userId },
      { balance: newBalance },
      {
        new: true,
        runValidators: true,
      }
    );

    const newTransaction = await Transaction.create({
      userId: userId,
      transactionType: "SELL",
      companyName: companyName,
      tickerName: tickerName,
      shares: shares,
      investment: investment,
    });

    res.status(200).json({
      status: "success",
      data: { newTransaction },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.getPurchasedStock = async (req, res) => {
  try {
    const filter = { userId: req.body.id };
    const allStocks = await PurchasedStock.find(filter);

    res.status(200).json({
      status: "success",
      results: allStocks.length,
      data: { allStocks },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const filter = { userId: req.body.id };
    const allTransactions = await Transaction.find(filter);

    res.status(200).json({
      status: "success",
      results: allTransactions.length,
      data: { allTransactions },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const filter = { userId: req.body.id };
    const allLogs = await Logs.find(filter);

    res.status(200).json({
      status: "success",
      results: allLogs.length,
      data: { allLogs },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const allInfo = await User.findById(filter);

    res.status(200).json({
      status: "success",
      data: { allInfo },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.updateName = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const update = { name: req.body.name };

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

exports.updatePassword = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const user = await User.findById(filter);

    const valid = await user.verifyPassword(
      req.body.oldPassword,
      user.password
    );
    if (!valid) {
      return res.status(400).json({ message: "wrong password" });
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

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

exports.delete = async (req, res) => {
  try {
    const filter1 = { _id: req.body.id };
    const filter2 = { userId: req.body.id };
    await User.findOneAndDelete(filter1);
    await PurchasedStock.deleteMany(filter2);
    await Transaction.deleteMany(filter2);
    await Logs.deleteMany(filter2);

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
