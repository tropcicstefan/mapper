var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
    name: String,
    text: String,
    pic: String,
    latitude: mongoose.Schema.Types.Decimal,
    longitude: mongoose.Schema.Types.Decimal,
    userid: String
});



module.exports = mongoose.model("location", locationSchema);