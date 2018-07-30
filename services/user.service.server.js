moudle.exports = function (app) {

    app.get('/api/user', findAllUsers);
    app.post('api/user', createUser);

    var userModel = require('../models/user/user.model.server');

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(user => {
                req.session.currentUser = user;
                res.send(user);
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(users =>
            res.send(users));
    }



};