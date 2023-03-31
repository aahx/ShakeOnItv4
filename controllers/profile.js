const UsersDB = require("../models/users");

function index(req, res) {
    const user = req.user;
    res.render("profile", {
        user
    });
};

async function checkGamertag(req, res) {
    const gamertag = req.query.gamertag;
    try {
        const doesGamertagAlreadyExist = await UsersDB.findOne({ gamertag: gamertag });
        res.json(Boolean(doesGamertagAlreadyExist));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" })
    }
};

async function updateGamertag(req, res) {
    const userId = req.user._id;
    const newGamertag = req.body.gamertag;

    try {
        await UsersDB.findOneAndUpdate(
            { _id: userId },
            { gamertag: newGamertag },
            { new: true }
        );
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    index,
    checkGamertag,
    updateGamertag
};