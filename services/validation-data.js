const Joi = require("@hapi/joi");

// Validation for login
const loginValidation = (data) => {
    // Define the schema for login validation using Joi
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(1024).required(),
    });
    // Validate the provided data against the schema
    return schema.validate(data);
};

// Validation for user registration
const registerValidation = (data) => {
    // Define the schema for registration validation using Joi
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(1024).required(),
        rol: Joi.string().min(3).max(255).required(),
        state: Joi.string().valid('Activo', 'Inactivo').required(),
        photo: Joi.string().min(3).max(1024).required()
    });
    // Validate the provided data against the schema
    return schema.validate(data);
};

// Export the validation functions for external use
module.exports = { registerValidation, loginValidation };
