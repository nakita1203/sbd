require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const documentRoutes = require('./routes/document');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/document', documentRoutes);

const PORT = process.env.PORT || 4901;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
