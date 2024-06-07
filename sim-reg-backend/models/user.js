const { pool } = require('../config/db.config.js');
const bcrypt = require('bcryptjs');

pool.connect().then(() => {
    console.log("Connected to PortgreSQL Database 🛢️");
})

// Register User
const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const accountResult = await pool.query(
        'INSERT INTO Account (username, email, phoneNumber, password) VALUES ($1, $2, $3, $4) RETURNING account_id',
        [user.username, user.email, user.phoneNumber, hashedPassword]
    );
    
    const account_id = accountResult.rows[0].account_id;

    await pool.query(
        'INSERT INTO Person (NIK, account_id, address_id, name, date_of_birth, place_of_birth, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [user.NIK, account_id, user.address_id, user.name, user.date_of_birth, user.place_of_birth, user.gender]
    );
};

module.exports = {createUser};
