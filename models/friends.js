const mongoose = require("mongoose");
const Schema = mongoose.Schema

const friendsSchema = new Schema({
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const friendsListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    friends: {
        type: [friendsSchema],
    }
});

module.exports = mongoose.model("FriendsList", friendsListSchema);