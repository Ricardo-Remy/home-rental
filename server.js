const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Connect Database
dbConnect();

// Init Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => (res.send('[Server] API running'),
console.log('[SERVER][GET] API running')
));

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/houseProfile', require('./routes/api/houseProfile'));

app.use(cors());
app.options('*', cors());


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[Server] started on port ${PORT}`));
