const { Pool } = require('pg');

const PG_URI =
  'postgres://hsjajdhj:2L0PzK_yQAlGyW7U9ekgqseRjNz3gDZD@suleiman.db.elephantsql.com/hsjajdhj';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
