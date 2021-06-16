const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema);

module.exports = User;