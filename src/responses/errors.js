module.exports = {
    DATABASE_ERROR: {
        code: 500001,
    },
    INVALID_CREDENTIALS: {
        code: 401001,
        message: 'Invalid credentials. You\'r e-mail or password are incorrect.',
    },
    VALIDATION_ERROR: {
        code: 400002,
        message: 'Error with validation.'
    },
    EXISTING_USER: {
        code: 400002,
        message: 'User with same e-mail address already exists.',
    },
    ACCESS_DENIED: {
        code: 401003,
        message: 'Access denied.',
    },
    EMPTY_COLLECTION: {
        code: 500004,
        message: 'Collection is empty.',
    },
    MULTER_ERROR: {
        code: 500005,
    },
    NOT_EXISTING_CUSTOMER: {
        code: 404004,
        message: 'Customer with this e-mail address doesn\'t exist.',
    },
};