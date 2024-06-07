const stream = require('stream');
// const express = require('express');
// const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
const { pool } = require('../config/db.config.js');

// const uploadRouter = express.Router();
// const upload = multer();

const KEYFILEPATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});

const uploadFile2Gdrive = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({
        version: 'v3',
        auth: auth
    }).files.create({
        media:{
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ['1gq-xm8Ncoch5wKZzRdXOVd8k5nz9QHHU']
        },
        fields: "id, name"
    })
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id;
}


const uploadFile = async (req, res) => {
    try {
        const { account_id } = req.body;
        const files = req.files;

        const ktp_id = await uploadFile2Gdrive(files.ktp[0]);
        const kk_id = await uploadFile2Gdrive(files.kk[0]);

        const [result] = await pool.query(
            'INSERT INTO Document (account_id, ktp_id, kk_id) VALUES ($1, $2, $3)',
            [account_id, ktp_id, kk_id]
        );

        res.status(200).send("Files are uploaded");
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = {
    uploadFile
};

