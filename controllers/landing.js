const UsersDB = require("../models/users");
const GamesDB = require("../models/games");

function index(req, res) {
    res.render("landing")
};

module.exports = {
    index
};