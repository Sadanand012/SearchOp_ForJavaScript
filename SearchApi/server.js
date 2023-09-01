require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dbconnect = require('./dbConnect')
const movieRoutes = require('./routes/movies');
const app = express();

app.use(express.json());
app.use(cors());
dbconnect();

app.use("/api", movieRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log(`Listenig on port http://localhost:${port}`);
})