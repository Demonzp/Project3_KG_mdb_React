const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

module.exports = (app) => {
    app.post('/signin', (req, res) => {
        const { email, password } = req.body;
        User.findOne({ email }).then((user) => {
            // Если пользователь с заданным email не найден, то выдаст ошибку.
            if (!user) {
                throw new Error('User does not exist!');
            }
            // Если найден - сравнение захешированных паролей при помощи функции compare от bcrypt.
            const valid = bcrypt.compareSync(password, user.password);
            // Если пароль верный - создаём токен при помощи jwt.
            if (valid) {
                // Функция sign генерирует цифровую подпись. ACCESS_SECRET_KEY - секретный ключ.
                const token = jwt.sign(user._id.toString(), process.env.ACCESS_SECRET_KEY);
                // Возвращаем сгенерированный токен. При неверно введённом пароле - ошибка.
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials!' });
            }
        }).catch((err) => res.status(500).json({ message: err.message }));
    });
};
