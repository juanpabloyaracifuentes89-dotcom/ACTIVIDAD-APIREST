require("dotenv").config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require("./db/db-conecction-mongo");

getConnection();


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/generos', require('./routes/genero'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/medias', require('./routes/media'));


app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});