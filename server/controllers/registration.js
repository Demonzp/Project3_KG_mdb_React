const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (app) => {
    // РЕГИСТРАЦИЯ пользователя в системе.
    app.post('/registration', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            User.create({
                login: req.body.login,
                email: req.body.email,
                password: hashedPassword,
            });
            res.json('Totally fine!');
            // res.redirect('/login');
        } catch (err) {
            res.json(err);
        }
    });
};
