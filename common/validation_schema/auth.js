module.exports = {
    register: {
        fullname: 'string',
        email: 'email',
        password: 'string|min:8',
    },
    login: {
        email: 'email',
        password: 'string|min:8'
    }
};