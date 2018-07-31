module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.put('/api/profile', updateUser);

    var userModel = require('../models/user/user.model.server');

    function updateUser(req, res) {
        var update = req.body;
        var currentUser = req.session.currentUser;
        if (!currentUser) {
            return;
        }
        userModel
            .updateUser(currentUser, update)
            .then(promise =>
            res.send(promise));
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
    function profile(req, res) {
        res.send(req.session.currentUser);
    }
    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(user => {
                if (user) {
                    req.session.currentUser = user;
                }
                res.json(user);
            });
    }
    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(user => {
                if (!user) {
                    return userModel
                        .createUser(newUser);
                }
            })
            .then(user => {
                if (user) {
                    req.session.currentUser = user;
                }
                res.json(user);
            });
    }
    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(users =>
            res.send(users));
    }
};