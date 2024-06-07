const { pool } = require('../config/db.config.js');
const bcrypt = require('bcryptjs');

// Register admin (karena kalo ga dari sini gaakan bisa login)
const createAdmin = async (username, email, phonenumber, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO admin (username, email, phonenumber, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, phonenumber, hashedPassword]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating admin:', error);
        throw error;
    }
};

module.exports = { createAdmin };