import User from '../models/User.js';
import express from 'express';
import pkg from 'bcryptjs'
import { checkEmailValidity, validateUsername } from '../utils/validations.js';
import authenticate from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const { hash, compare } = pkg;

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const validEmail = checkEmailValidity(email);
        if (!validEmail) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/update/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username && username !== user.username) {
            const isValidUsername = validateUsername(username);

            if (!isValidUsername) {
                return res.status(400).json({ message: 'Invalid username format' });
            }

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ message: 'Username is already in use' });
            }

            user.username = username;
        }

        if (password && !(await compare(password, user.password))) {
            const hashedPassword = await hash(password, 10);
            user.password = hashedPassword;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});


router.delete('/delete/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
