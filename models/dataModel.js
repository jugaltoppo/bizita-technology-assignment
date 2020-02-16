var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
        id: String,
        name: String,
        category: String,
        categoryid: String,
        address: String,
        description: String,
        contact: String,
        empcode: String,
        image: String
});

var Data = mongoose.model("Data", dataSchema);
module.exports = Data;