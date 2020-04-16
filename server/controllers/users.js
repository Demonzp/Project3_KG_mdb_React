const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (app) => {
    // ПОЛУЧЕНИЕ полного списка пользователей.
    app.get('/users/', (req, res) => {
        User.find()
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    });

    // // ДОБАВЛЕНИЕ в список информации о новых пользователях.
    app.post('/users/create', (req, res) => {
        User.create(req.body)
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    });

    // РЕДАКТИРОВАНИЕ информации о пользователе по ID.
    app.put('/users/update/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    });

    // УДАЛЕНИЕ информации о пользователе по ID.
    app.delete('/users/delete/:id', (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.json('Deleted successfully.'))
            .catch((err) => console.log(err));
    });
};
