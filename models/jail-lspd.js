const { Schema, model } = require("mongoose");
module.exports = model("jail-lspd", new Schema({
  haw: Number,
  userId: String,
  by: String,
  reason: String,
  time: String,
  condition: String, 
  id: Number
}))