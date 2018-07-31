module.exports = function (app) {
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/course/:courseId/section', createSection);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete('/api/section/:sectionId', removeSection);
    app.delete('/api/student/section/:sectionId', unenrollStudentFromSection);
    app.put('/api/section/:sectionId', updateSection);
    app.get('/api/section/:sectionId/student', findStudentsForSection);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findStudentsForSection(req, res) {
        var sectionId = req.params.sectionId;
        enrollmentModel
            .findStudentsForSection(sectionId)
            .then(enrollments =>
            res.json(enrollments));
    }
    function updateSection(req, res) {
        var update = req.body;
        var sectionId = req.params.sectionId;
        sectionModel
            .updateSection(sectionId, update)
            .then(promise =>
                res.send(promise));
    }
    function unenrollStudentFromSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        if (!currentUser) {
            return;
        }
        var enrollment = {
            student: currentUser._id,
            section: sectionId
        };
        sectionModel
            .incrementSectionSeats(sectionId)
            .then(() => {
                return enrollmentModel
                    .unenrollStudentFromSection(enrollment);
            })
            .then(promise =>
                res.send(promise));
    }
    function removeSection(req, res) {
        var sectionId = req.params.sectionId;
        sectionModel
            .removeSection(sectionId)
            .then(promise =>
            res.send(promise));
    }

    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        if (currentUser) {
            enrollmentModel
                .findSectionsForStudent(currentUser._id)
                .then(enrollments =>
                    res.json(enrollments));
        } else {
            res.send(currentUser);
        }
    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        if (!currentUser) {
            return;
        }
        var studentId = currentUser._id;
        var newEnrollment = {
            student: studentId,
            section: sectionId
        };
        enrollmentModel
            .findEnrollment(newEnrollment)
            .then(enrollment => {
                if (!enrollment) {
                    return sectionModel
                        .decrementSectionSeats(sectionId);
                }
            })
            .then(response => {
                if (response) {
                    return enrollmentModel
                        .enrollStudentInSection(newEnrollment);
                }
            })
            .then(enrollment =>
                res.json(enrollment));
    }

  function findSectionsForCourse(req, res) {
      var courseId = req.params.courseId;
      sectionModel
          .findSectionsForCourse(courseId)
          .then(sections =>
            res.json(sections));
  }

  function createSection(req, res) {
    var section = req.body;
    var user = req.session.currentUser;
    if (user && user.username === 'admin') {
        sectionModel.createSection(section)
            .then(section =>
                res.json(section));
    } else {
        res.send(404);
    }
  }
};