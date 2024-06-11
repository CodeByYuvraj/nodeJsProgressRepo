const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    Heading: {
        type: String,
    },
    Description: {
        type: String,
    },
    Address:{
        type: Array,
    },
    CallForHelp: {
        type: Array,
    },
    GeneralSupport: {
        type: Array,
    }
});

const Admin = mongoose.model("Admin", Schema);
module.exports = Admin

