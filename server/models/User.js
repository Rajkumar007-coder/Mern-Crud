const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    userPhone: {
        type: Number,
        require: true,
    }
});

const Users = mongoose.model("userData", userSchema);
module.exports = Users;

