const User = require('../Model/User');
const jwt = require('jsonwebtoken');

var jwtSecret = 'mysecrettoken';

const createUser = async (req, res) => {

    const { userId, firstName, lastName, email, dateOfBirth, mobile, status, password, accountType } = req.body;


    try {

        let findUser = await User.findOne({ email });

        if (findUser) {

            res.status(400).json({ errors: [{ message: "User already exists!!!" }] });
            return -1;
        }

        const newUser = new User({ userId, firstName, lastName, email, dateOfBirth, mobile, status, password, accountType });

        await newUser.save();
        //res.status(200).json({ newUser });

        const payload = {
            user: {
                id: newUser.id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, accountType: newUser.accountType, email: newUser.email, newUser });
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials..." }] });
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: 2 }, (err, token) => {
            if (err) throw err;
            res.json({ token, accountType: user.accountType, email: user.email, status: user.status, id:user.id, password:user.password });
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getUsers = async (req, res) => {

    try {

        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {

        res.status(400).json({ message: err.message });
    }
}

const getUserById = async (req, res) => {

    const id = req.params.id;

    try {

        const users = await User.findById(id);
        res.status(200).json(users);
    }
    catch (err) {

        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {

    const { id } = req.params;
    const { userId, firstName, lastName, email, dateOfBirth, mobile, status, password, accountType } = req.body;

    try {

        const updatedUser = ({ userId, firstName, lastName, email, dateOfBirth, mobile, status, password, accountType, _id: id });
        await User.findByIdAndUpdate(id, updatedUser, { new: true });
        res.json(updatedUser);
    }
    catch (err) {

        res.status(400).json({ message: err.message });
    }
}

module.exports = { createUser, getUsers, getUserById, updateUser, loginUser }