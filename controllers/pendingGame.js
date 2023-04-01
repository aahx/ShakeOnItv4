const GameDB = require("../models/games");
const UsersDB = require("../models/users");

async function index(req, res) {
    const pendingGames = await GameDB.find({
        $or: [
            { player1: req.user._id, status: { $in: ["pending", "declined"] } },
            { player2: req.user._id, status: { $in: ["pending", "declined"] } }
        ]
    });

    const user = await UsersDB.findById(req.user._id);
    const userGamertag = user.gamertag;


    const gamesData = await Promise.all(pendingGames.map(async (game) => {
        const player1 = await UsersDB.findById(game.player1); // Retrieve player1's gamertag
        const player2 = await UsersDB.findById(game.player2); // Retrieve player2's gamertag
        const formattedDate = new Date(game.expiration).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        return {
            id: game._id,
            name: game.name,
            description: game.description,
            wager: game.wager,
            expiration: formattedDate,
            player1: player1.gamertag,
            player2: player2.gamertag,
            status: game.status,
        };
    }));

    // console.log(gamesData)
    res.render('pendingGame', {
        gamesData: gamesData,
        userGamertag: userGamertag,
    });
};


async function accept(req, res) {
    const gameId = req.params.id;

    // Update game status to active
    await GameDB.findByIdAndUpdate(
        gameId,
        { status: 'accepted' },
        { new: true }
    );

    res.redirect('/landing');
};

async function decline(req, res) {
    const gameId = req.params.id;

    // Update game status to active
    await GameDB.findByIdAndUpdate(
        gameId,
        { status: 'declined' },
        { new: true }
    );

    res.redirect('/pending');
};


module.exports = {
    index,
    accept,
    decline,
};