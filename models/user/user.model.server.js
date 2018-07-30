var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}
function findUserByUsername(username) {
    return userModel.findOne({username: username});
        // .then(users =>
        //     users.length !== 0
        // );
}
function createUser(user) {
    return userModel.create(user);
}
function findAllUsers() {
    return userModel.find();
}

module.exports = {
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findAllUsers: findAllUsers
};