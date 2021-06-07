// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    userNullAsDefault: true,
    connection: {
      filename: './data/dev.sqlite3'
    },
    
  },

  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
