const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    shortUrls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShortURLStore'
        }
    ]
})

module.exports = mongoose.model("User", userSchema);