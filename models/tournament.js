const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  contestant:{
    type: String,
    required: true,
    trim: true,
  },
  opponent:{
    type: String,
    required: true,
    trim: true,
  },
  expected_score: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Can't submit a non value.");
    },
  },
});

const Tournament = mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;