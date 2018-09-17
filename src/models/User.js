const mongoose = require('mongoose');
const {Schema} = mongoose;

var UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

const getUserByUserName = (username) => User.findOne({
    username
});

const addNewUser = (user) => {
    let newUserModel = new User({
        username: user.username,
        password: user.password
    });

    return newUserModel.save();
}

module.exports = {
    addNewUser,
    getUserByUserName
}