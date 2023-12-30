const pool = require('../config/db.config');

const Activity = {
  create: async (newActivity) => {
    const query = `
      INSERT INTO activities(name, description, location, price)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      newActivity.name,
      newActivity.description,
      newActivity.location,
      newActivity.price
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // outros métodos...
};

module.exports = Activity;