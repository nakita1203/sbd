const express = require('express');
const router = express.Router();
const { getRequest, processRequest, registerAdmin} = require('../controllers/adminController');

// Mendapatkan semua permintaan pendaftar
router.get('/requests', getRequest);
// Memproses permintaan pendaftar
router.put('/requests/process', processRequest);
// Membuat akun admin
router.post('/register', registerAdmin);

module.exports = router;
