const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  patientName: {
    type: String,
  },
  patientAge: {
    type: String,
  },
  patientGender: {
    type: String,
  },
  patientPhoneNo: {
    type: String,
  },
  patientAddress: {
    type: String,
  },
  need: {
    type: String,
  },
  otherNeed: {
    type: String,
  },
  Bg: {
    type: String,
  }
},{
  timestamps: true
});

const User = mongoose.model("User", Schema);
module.exports = User;
