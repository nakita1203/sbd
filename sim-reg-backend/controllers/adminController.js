const { getAllRequests, updateRequestStatus } = require('../models/request');
const { createAdmin } = require('../models/admin');

//Mendapatkan semua permintaan pendaftar
const getRequest = async (req, res) => {
    try {
        const requests = await getAllRequests();
        res.json(requests);
    } catch (error) {
        console.error('Error getting requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Memproses permintaan pendaftar
const processRequest = async (req, res) => {
    const { request_id, stat, schedule } = req.body;

    try {
        const updatedRequest = await updateRequestStatus(request_id, stat, schedule);
        res.json(updatedRequest);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Membuat akun admin
const registerAdmin = async (req, res) => {
    const { username, email, phonenumber, password } = req.body;

    try {
        const newAdmin = await createAdmin(username, email, phonenumber, password);
        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getRequest,
    processRequest,
    registerAdmin
}