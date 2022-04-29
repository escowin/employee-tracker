const validator = require('validator');

const validate = {
    validateSalary(num) {
        if (validator.isDecimal(num)) return true;
        return "use numeric input"
    }
};

module.exports= validate;