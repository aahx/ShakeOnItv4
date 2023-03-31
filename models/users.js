const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
    gamertag: {
        type: String,
        unique: true,
    }
});


usersSchema.pre('save', async function (next) {
    console.log("-----PRESCHEMA-----")
    function generateNewGamertag() {
        const animals = ['Cat', 'Dog', 'Sheep', 'Frog', 'T-Rex', 'Monkey', 'Rat', 'Snake', 'Dragon'];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        const randomNumber = Math.floor(Math.random() * 9999) + 1;
        const paddedNumber = randomNumber.toString().padStart(4, '0');
        return `${randomAnimal}_${paddedNumber}`;
    };
    let generatedGamertag = generateNewGamertag()

    // going to check if a separate user already has this randomly generatedGamertag, if they do, it will generate a new tag
    let existingGamertag = await this.constructor.findOne({ gamertag: generatedGamertag });
    while (existingGamertag) {
        generatedGamertag = generateNewGamertag();
        existingGamertag = await this.constructor.findOne({ gamertag: generatedGamertag });
    };

    this.gamertag = generatedGamertag;
    next();
});


module.exports = mongoose.model('Users', usersSchema);