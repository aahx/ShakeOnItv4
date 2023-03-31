const mongoose = require("mongoose");
const Schema = mongoose.Schema

const gamesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    wager: String,
    expiration: Date,

    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    },
    winner: String
});

module.exports = mongoose.model("Games", gamesSchema);