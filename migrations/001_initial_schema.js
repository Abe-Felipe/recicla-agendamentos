exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('usuarios', {
    id: { type: 'serial', primaryKey: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('agendamentos', {
    id: { type: 'serial', primaryKey: true },
    nome_completo: { type: 'varchar(255)', notNull: true },
    endereco: { type: 'text', notNull: true },
    tipo_material: { type: 'text[]', notNull: true },
    data_coleta: { type: 'date', notNull: true },
    telefone: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(255)', notNull: false },
    status: { type: 'varchar(50)', notNull: true, default: 'Pendente' },
    protocolo: { type: 'varchar(255)', notNull: true, unique: true },
    justificativa: { type: 'text' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('agendamentos');
  pgm.dropTable('usuarios');
};