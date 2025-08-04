require('dotenv').config({ path: '../.env' });
const bcrypt = require('bcryptjs');
const db = require('../src/config/database');

async function seed() {
   try {
    const adminEmail = 'admin@recicla.com';
    const adminPassword = process.env.POSTGRES_PASSWORD || 'senha4321secreta';

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await db.query(
      'INSERT INTO usuarios (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING;',
      [adminEmail, passwordHash]
    );
  } catch (error) {
    console.error('Erro durante o seeding:', error);
  } finally {
    await db.pool.end();
  }
}

seed();