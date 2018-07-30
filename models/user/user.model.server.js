var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}
function findAllUsers() {
    return userModel.find();
}

module.exports = {
    createUser: createUser,
    findAllUsers: findAllUsers
};