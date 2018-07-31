var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function updateSection(sectionId, update) {
    return sectionModel.update({_id: sectionId}, update);
}

function removeSection(sectionId) {
    return sectionModel.remove({_id: sectionId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

module.exports = {
    updateSection: updateSection,
    removeSection: removeSection,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse
};