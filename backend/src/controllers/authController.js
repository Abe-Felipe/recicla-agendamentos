const authService = require('../services/authService');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
      }

      const token = await authService.login(email, password);

      res.status(200).json({ token });

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

module.exports = authController;