const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedError('Неверные данные для входа');
  }

  const hasRightPassword = await bcrypt.compare(password, user.password);

  if (!hasRightPassword) {
    throw new UnauthorizedError('Неверные данные для входа');
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    NODE_ENV === 'production' ? JWT_SECRET : 'secret',
    {
      expiresIn: '7d',
    },
  );

  res.send({ token });
}
module.exports = { login };
