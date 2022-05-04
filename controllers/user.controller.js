const { User } = require('../models/user.model');

const userSingUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const accountNumber = Math.floor(Math.random() * 999999);

    const newUser = await User.create({
      name,
      email,
      password,
      accountNumber,
    });

    // if (amount < 1000) {
    //   return res.status(404).json({
    //     status: 'error',
    //     message: 'Amount not valid, must be up to 1000 UD',
    //   });
    // }

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { password } = req.body;

    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found, pleace register',
      });
    }

    await user.create({ password });

    res.status(201).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const getIdHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found, pleace register',
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  userSingUp,
  getIdHistory,
};
