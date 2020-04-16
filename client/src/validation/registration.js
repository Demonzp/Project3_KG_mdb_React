export default function Registration(values){
    const errors = {};

    if (!values.email) {
        errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }
    
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 3) {
        errors.password = "Password needs to be equal or more than 9 characters";
    }
    
    if (!values.login) {
        errors.login = "login is required";
    } else if(values.login.length < 2){
        errors.login = "Login needs to be equal or more than 2 characters";
    } 

    return errors;
}