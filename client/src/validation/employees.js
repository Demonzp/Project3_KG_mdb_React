export default function Employees(values){
    const errors = {};

    if (!values.name) {
        errors.name = "Name is required";
    }

    if (!values.sex) {
        errors.sex = "Sex is required";
    }

    if (!values.birthday) {
        errors.birthday = "birthday is required";
    }

    if (!values.contacts) {
        errors.contacts = "Contacts is required";
    }

    if (!values.position) {
        errors.position = "Position is required";
    }

    if (!values.salary) {
        errors.salary = "Salary is required";
    }
    
    return errors;
}