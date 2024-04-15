const db = require('../db/objeto');

const userController = {
    login: function(req, res) {
        res.render('login');
    },
    register: function(req, res) {
        res.render('register');
    },
    profile: function(req, res) {
        
        res.render('profile', {usuario: db.usuario});
    },
    profileEdit: function(req, res) {
        res.render('profile-edit');
    }
}

module.exports = userController;