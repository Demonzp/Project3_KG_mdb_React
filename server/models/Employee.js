const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Функция для округления вводимого пользователем значения зарплаты сотрудника до сотых.
function salarySet(value) {
    return (Number((value*1).toFixed(2)));
};

// Непосредственно схема "Сотрудник".
const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        sex: {
            type: String,
            required: true,
            trim: true,
        },

        birthday: {
            type: String,
            required: true,
            trim: true,
        },

        contacts: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: Number,
            set: salarySet,
            required: true,
        },
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: true },
    },
);

EmployeeSchema.plugin(mongoosePaginate);

mongoose.model('Employee', EmployeeSchema);
