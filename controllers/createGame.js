const UsersDB = require("../models/users");
const FriendsListDB = require("../models/friends");
const GameDB = require("../models/games");

async function index(req, res) {
    const friendsList = await FriendsListDB.findOne({ userId: req.user._id });
    let friendsGamertags = null;
    if (friendsList && friendsList.friends.length > 0) {
        const userPromises = friendsList.friends.map(async (friend) => {
            let user = await UsersDB.findOne({ _id: friend.friendId });
            return user.gamertag;
        });
        friendsGamertags = await Promise.all(userPromises);
    };

    res.render('createGame', {
        friendsGamertags: friendsGamertags,
        errorMessage: null,
        successMessage: null
    })
};

async function newGame(req, res) {
    try {
        // Get the selected friend id from the form
        const selectedFriend = await UsersDB.findOne({ gamertag: req.body.player2 });
        const selectedFriendId = selectedFriend._id;
        console.log("newgame, selected friend id", selectedFriendId);

        // Create a new game document
        const newGame = new GameDB({
            name: req.body.name,
            description: req.body.description,
            wager: req.body.wager,
            expiration: req.body.expiration,
            player1: req.user._id, // Set player1 to req.user._id
            player2: selectedFriendId,
            status: "pending",
            winner: "",
            loser: ""
        });

        // Save the new game document
        await newGame.save();

        // im calling this pretty often hmmm.. maybe comparmentalize it and call the function..
        const friendsList = await FriendsListDB.findOne({ userId: req.user._id });
        let friendsGamertags = null;
        if (friendsList && friendsList.friends.length > 0) {
            const userPromises = friendsList.friends.map(async (friend) => {
                let user = await UsersDB.findOne({ _id: friend.friendId });
                return user.gamertag;
            });
            friendsGamertags = await Promise.all(userPromises);
        };

        res.render("createGame", {
            friendsGamertags: friendsGamertags,
            errorMessage: "",
            successMessage: "Game created successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = {
    index,
    newGame
};