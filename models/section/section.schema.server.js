var mongoose = require('mongoose');
var sectionSchema =  mongoose.Schema({
    name: String,
    seats: Number,
    courseId: Number,
    // numberEnrolled: {type: Number, default: 0}
    // students: [String]
}, {collection: 'section'});
module.exports = sectionSchema;
