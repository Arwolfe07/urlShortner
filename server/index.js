if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Url Shortner Backend...');
});
app.use('/user',userRoutes);
app.use('/url',urlRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
    .then(app.listen(PORT, () => {
        console.log('Listening on PORT: ', PORT);
    }))
    .catch((err) => {
        console.log('Some error occured: ', err);
    })


