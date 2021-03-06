var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel =mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}
function findStudentsForSection(sectionId) {
    return enrollmentModel
        .find({section: sectionId})
        .populate('student')
        .exec();
}

function findEnrollment(enrollment) {
    return enrollmentModel.findOne(enrollment);
}

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function unenrollStudentFromSection(enrollment) {
    return enrollmentModel.remove(enrollment);
}

module.exports = {
    findStudentsForSection: findStudentsForSection,
    unenrollStudentFromSection: unenrollStudentFromSection,
    findSectionsForStudent: findSectionsForStudent,
    findEnrollment: findEnrollment,
    enrollStudentInSection: enrollStudentInSection
};