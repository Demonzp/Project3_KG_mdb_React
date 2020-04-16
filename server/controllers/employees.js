const mongoose = require('mongoose');
const authMdw = require('../middleware/auth');

const Employee = mongoose.model('Employee');

module.exports = (app) => {

    // ПОЛУЧЕНИЕ полного списка сотрудников (mongoose-paginate).
    app.get('/employees', authMdw, (req, res) => {
    	const page = parseInt(req.query.page, 10) || 1;
    	const limit = parseInt(req.query.limit, 10) || 15;
        Employee.paginate({}, {page, lean: true, limit})
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    });

    // ДОБАВЛЕНИЕ в список информации о новых сотрудниках.
    app.post('/employees/create', authMdw, (req, res) => {
        Employee.create(req.body)
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    });

    // РЕДАКТИРОВАНИЕ информации о сотруднике по ID.
    app.put('/employees/update/:id', authMdw, (req, res) => {
        Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    });

    // УДАЛЕНИЕ информации о сотруднике по ID.
    app.delete('/employees/delete/:id', authMdw, (req, res) => {
        Employee.deleteOne({ _id: req.params.id })
            .then(() => res.json('Deleted successfully.'))
            .catch((err) => console.log(err));
    });
};
