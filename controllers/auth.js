const bcrypt = require('bcrypt');
const { User } = require('../models');
const schema = require('../common/validation_schema');
const err = require('../common/error');
const Validator = require('fastest-validator');
const v = new Validator;
const jwt = require('jsonwebtoken');
const {
    JWT_SECRET_KEY
} = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const body = req.body;
            let { fullname, email, password } = body;
            const val = v.validate(body, schema.auth.register);
            if (val.length) return err.bad_request(res, val[0].message);

            const exist = await User.findOne({where: {email: email}});
            if (exist)  return err.bad_request(res, 'User already exist')

            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                fullname,
                email,
                password: hashedPass
            });

            return res.status(201).json({
                status: 'CREATED',
                message: 'User successfully registered',
                data: {
                    id: newUser.id,
                    fullname: newUser.fullname,
                    email: newUser.email
                }
            });
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const body = req.body;
            const { email, password } = body;
            const val = v.validate(body, schema.auth.login);
            if (val.length) return err.bad_request(res, val[0].message);

            const user = await User.findOne({where: {email: email}});
            if (!user) return err.not_found(res, 'User not found');

            const passcorrect = await bcrypt.compare(password, user.password);
            if (!passcorrect) return err.bad_request(res, 'Wrong password');

            const payload = {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            };
            req.user = payload;

            const token = jwt.sign(payload, JWT_SECRET_KEY);
            req.user.token = token;

            console.log(token);

            return res.status(200).json({
                status: 'OK',
                message: 'Login success',
                data: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                    token: token
                }
            });
        } catch (error) {
            next(error);
        }
    }
}