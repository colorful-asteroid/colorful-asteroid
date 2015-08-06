module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'Sprint_Reflect',
      user:     'RyanJamilMoose'
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};
