const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 5050 || process.env.PORT;

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/bookLibrary";

mongoose.connect(
    dbURL,
    () => {
        console.log('Connected to DB');
    },
    (e) => console.error('NO CONNECTION', e)
);

app.listen(PORT, () => {
    console.log(`On port ${PORT}`)
});