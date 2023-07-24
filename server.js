require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT;
process.env.TZ = "Asia/Jakarta";

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));

app.use('/v1', router);

app.use((req, res, next) => {
    return res.status(404).json({
        status: 'NOT FOUND',
        message: 'Resource Not Found',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        message: err.message,
        data: null
    });
});

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));