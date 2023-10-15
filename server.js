const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', userRoutes);

const PORT = 666;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
