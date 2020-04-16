const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Получаем хэдер с авторизацией, если нет - возвращаем ошибку.
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
    }
    // Достаём из хэдера токен и валидируем его.
    const token = authHeader.replace('Bearer ', '');
    // Применяем try-catch, т.к. verify выдаёт исключение, если токен не прошёл валидацию.
    // Именно эту ошибку ловим в catch, при этом возвращая сообщение о неправильном токене.
    try {
        jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid Token!' });
        }
    }
    // next передаёт "ход" следующему middleware при его наличии, иначе - обработчику запросов.
    next();
};
