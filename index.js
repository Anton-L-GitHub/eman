const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const genres = require('./routes/genres')
const home = require('./routes/home')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));
app.use('/api/genres', genres);
app.use('/', home);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));