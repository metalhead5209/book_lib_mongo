const express = require('express');
const path = require('path');
const mongoose = require('mongoose');



const app = express();
const PORT = 5050 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`On port ${PORT}`)
});