var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {password: 0});
}
function findUserByUsername(username) {
    return userModel.findOne({username: username});
}
function createUser(user) {
    return userModel.create(user);
}
function findAllUsers() {
    return userModel.find();
}
function updateUser(currentUser, update) {
    return userModel.update(currentUser, update);
}
module.exports = {
    updateUser: updateUser,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findAllUsers: findAllUsers
};