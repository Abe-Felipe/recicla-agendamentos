const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const authService = {
  login: async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: 'admin',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  },
};

module.exports = authService;