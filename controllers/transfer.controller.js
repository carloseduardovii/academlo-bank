const { where } = require('sequelize/types');
const { User } = require('../models/users.model');
const { Transfer } = require('../models/transfer.model');

const receiveTransfer = async (req, res) => {
  try {
    const { accountNumberReceiver, accountNumberSender, amount } = req.body;

    const receiverAccount = await User.findOne({
      where: { accountNumber: accountNumberReceiver },
    });
    const senderAccount = await User.findOne({
      where: { accountNumber: accountNumberSender },
    });

    if (!receiverAccount) {
      return res.status(404).json({
        status: 'error',
        msg: 'Account not found',
      });
    }

    if (senderAccount.amount < amount) {
      return res.status(404).json({
        status: 'error',
        msg: 'Amount is not valid',
      });
    }

    receiverAccount.amount += Number(amount);
    senderAccount.amount -= Number(amount);

    await User.update(
      { amount: receiverAccount.amount },
      { where: { accountNumber: accountNumberReceiver } }
    );
    await User.update(
      { amount: senderAccount.amount },
      { where: { accountNumber: accountNumberSender } }
    );

    await Transfer.create({
      receiverUserId: accountNumberReceiver,
      senderUserId: accountNumberSender,
      amount,
    });

    res.status(200).json({});
  } catch (error) {
    console.log(error);
  }
};

module.exports = { receiveTransfer };
