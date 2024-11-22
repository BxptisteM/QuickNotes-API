import User from '../models/User.js';

export const checkEmailValidity = async (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const emailExists = await User.findOne({ email });

    if (!emailRegex.test(email) || emailExists) {
        return false;
    }
    return true;
}

export const validateUsername = async (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
}
