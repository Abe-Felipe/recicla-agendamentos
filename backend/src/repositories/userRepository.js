const db = require('../config/database');

const userRepository = {
  findByEmail: async (email) => {
    const queryText = 'SELECT * FROM usuarios WHERE email = $1';

    const result = await db.query(queryText, [email]);

    return result.rows[0];
  },
};

module.exports = userRepository;