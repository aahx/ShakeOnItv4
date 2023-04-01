const GamesDB = require("../models/games");
const UsersDB = require("../models/users");

async function index(req, res) {
    const acceptedGames = await GamesDB.find({
        $or: [
            { player1: req.user._id },
            { player2: req.user._id }
        ],
        status: "accepted"
    });

    const acceptedGamesData = await Promise.all(acceptedGames.map(async (game) => {
        const player1 = await UsersDB.findById(game.player1); // Retrieve player1's gamertag
        const player2 = await UsersDB.findById(game.player2); // Retrieve player2's gamertag
        const formattedDate = new Date(game.expiration).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        return {
            _id: game._id,
            name: game.name,
            description: game.description,
            wager: game.wager,
            expiration: formattedDate,
            player1: player1.gamertag,
            player2: player2.gamertag,
            status: game.status,
        };
    }));

    res.render("landing", {
        acceptedGamesData: acceptedGamesData,
    })
};

module.exports = {
    index
};