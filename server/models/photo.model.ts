// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;

const photoScheme: any = new Schema({
    photoID: Number,
    albumId: Number,
    title: String,
    url: String,
    thumbnailUrl: String,
    owner: String
});

module.exports = {
    photoScheme
}
