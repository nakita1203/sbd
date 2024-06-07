const { pool } = require('../config/db.config.js');

//Mendapatkan semua permintaan pendaftar (untuk admin)
const getAllRequests = async () => {
    const result = await pool.query(`
    SELECT r.*, p.name, p.date_of_birth, p,place_of_birth, d.ktp_id, d.kk_id
    FROM Request r
    JOIN Person p ON r.nik = p.nik
    JOIN Document d ON r.document_id = d.document_id
    `);

    return result.rows;

};

//Memperbarui status permintaaan pendaftar (untuk admin)
const updateRequestStatus = async (request_id, stat, schedule) => {
    const result = await pool.query(
        'UPDATE Request SET status = $1, schedule = $2 WHERE request_id = $3 RETURNING *',
        [stat, schedule, request_id]
    );

    return result.rows[0];

};

//Membuat permintaan baru
const addRequest = async (nik, polres_id, document_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO request (nik, polres_id, document_id) VALUES ($1, $2, $3) RETURNING *',
            [nik, polres_id, document_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding request:', error);
        throw error;
    }
};

// Menghapus request
const deleteRequest = async (request_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM request WHERE request_id = $1',
            [request_id]
        );
    } catch (error) {
        console.error('Error deleting request:', error);
        throw error;
    }
}

module.exports = {
    getAllRequests,
    updateRequestStatus,
    addRequest,
    deleteRequest
}