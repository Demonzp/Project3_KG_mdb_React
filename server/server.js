require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Подключаем разрешения на сross-origin resource sharing.
app.use(cors());

// Подключаем модели.
require('./models/Employee');
require('./models/User');

// Подключаем контроллеры.
require('./controllers/employees')(app);
require('./controllers/users')(app);
require('./controllers/registration')(app);
require('./controllers/auth')(app);

// Подключение к БД, при успешном подключении - запуска сервера.
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => app.listen(process.env.APP_PORT, () => {
        console.log(`Server listening on port ${process.env.APP_PORT}.`);
    }))
    .catch(() => console.error(`Connection failed: ${process.env.DB_CONNECT}`));
