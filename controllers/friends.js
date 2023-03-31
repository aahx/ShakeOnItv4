const UsersDB = require("../models/users");
const FriendsListDB = require("../models/friends");

async function index(req, res) {
    try {
        const friendsList = await FriendsListDB.findOne({ userId: req.user._id });
        if (friendsList && friendsList.friends.length > 0) {
            const userPromises = friendsList.friends.map(async (friend) => {
                let user = await UsersDB.findOne({ _id: friend.friendId });
                return user.gamertag;
            });
            const friendsGamertags = await Promise.all(userPromises);
            console.log("friendsGamertags", friendsGamertags);

            res.render('friends', {
                friendsGamertags: friendsGamertags,
                errorMessage: null,
                successMessage: null
            })
        } else {
            res.render('friends', {
                friendsGamertags: null,
                errorMessage: null,
                successMessage: null
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
};


async function validate(req, res) {
    try {
        const checkNewFriendUser = await UsersDB.findOne({ gamertag: req.body.gamertag }); // taking gamertag from req.body and getting ._id
        const checkNewFriendId = checkNewFriendUser?._id;
        const friendsList = await FriendsListDB.findOne({ userId: req.user._id });

        let friendsGamertags = null;
        // conditional for checking and returning friendsGamertags
        if (friendsList && friendsList.friends.length > 0) {
            const userPromises = friendsList.friends.map(async (friend) => {
                let user = await UsersDB.findOne({ _id: friend.friendId });
                return user.gamertag;
            });
            friendsGamertags = await Promise.all(userPromises); // getting list of gamertags from FriendsListSchema
        };

        // Check if this friend is already in the user' friendslist
        if (friendsList?.friends.some(friend => String(friend.friendId) === String(checkNewFriendId))) {
            res.render('friends', {
                friendsGamertags: friendsGamertags,
                errorMessage: "Friend is already in your friends list",
                successMessage: null
            });
            return;
        };

        // Check if you're trying to add yourself
        if (req.user.gamertag === req.body.gamertag) {
            res.render('friends', {
                friendsGamertags: friendsGamertags,
                errorMessage: "That's you! Can't add yourself to your friends list",
                successMessage: null
            });
            return;
        };

        // Check if friend exists in the UserDB
        const userDoesExist = await UsersDB.findOne({ _id: checkNewFriendId });

        if (!userDoesExist) {
            res.render('friends', {
                friendsGamertags: friendsGamertags,
                errorMessage: "Gamertag does not exist",
                successMessage: null
            });
            return;
        };

        // after validating that the gamertag is not in your user list, and it is existing:
        // if there your friendsList exist (holds at least one friend)
        if (friendsList && friendsList.friends.length > 0) {
            friendsList.friends.push({ friendId: userDoesExist._id });
            await friendsList.save();

            // getting your updated friendslist post save()
            const updatedFriendsList = await FriendsListDB.findOne({ userId: req.user._id });
            const updatedUserPromises = updatedFriendsList.friends.map(async (friend) => {
                let user = await UsersDB.findOne({ _id: friend.friendId });
                return user.gamertag;
            });
            const updatedFriendsGamertags = await Promise.all(updatedUserPromises);

            res.render('friends', {
                friendsGamertags: updatedFriendsGamertags,
                errorMessage: null,
                successMessage: "Friend Added Succesfully (for development - message 2)"
            });
            return;
        } else { // if your friendList does not exist (haven't added any friends yet) - need to create new FriendsListDB
            console.log("else, adding", userDoesExist._id);

            const newFriendsList = new FriendsListDB({
                userId: req.user._id,
                friends: [{ friendId: userDoesExist._id }]
            });
            await newFriendsList.save();

            const updatedFriendsList = await FriendsListDB.findOne({ userId: req.user._id });
            const updatedUserPromises = updatedFriendsList.friends.map(async (friend) => {
                let user = await UsersDB.findOne({ _id: friend.friendId });
                return user.gamertag;
            });
            const updatedFriendsGamertags = await Promise.all(updatedUserPromises);

            res.render('friends', {
                friendsGamertags: updatedFriendsGamertags,
                errorMessage: null,
                successMessage: "Friend Added Successfully (for development - message 1)"
            });
            return;
        };
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
};


module.exports = {
    index,
    validate,
};