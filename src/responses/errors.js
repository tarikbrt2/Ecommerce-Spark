module.exports = {
    DATABSE_ERROR: {
        code: 400001,
        message: 'Error with the databse.',
    },
    INVALID_CREDENTIALS: {
        code: 500001,
        message: 'Invalid credentials. You\'r e-mail or password are incorrect.',
    },
    VALIDATION_ERROR: {
        code: 400002,
        message: 'Error with validation.'
    },
    EXISTING_USER: {
        code: 500002,
        message: 'User with same e-mail address already exists.',
    },
    INCORRECT_PASSWORD: {
        code: 500003,
        message: 'Wrong password.',
    },
    ACCESS_DENIED: {
        code: 400003,
        message: 'Access denied.',
    },
    EMPTY_COLLECTION: {
        code: 400004,
        message: 'Collection is empty.',
    },
    MULTER_ERROR: {
        code: 400005,
    },
    NOT_EXISTING_CUSTOMER: {
        code: 500004,
        message: 'Customer with this e-mail address doesn\'t exist.',
    },
};