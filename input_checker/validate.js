// const validator = require('validator');

const validate = {
    validateSalary(num) {
        if (validator.isDecimal(num)) return true;
        return 'valid salary must be entered (numeral input)'
    }
};
module.exports= validate;