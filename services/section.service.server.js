module.exports = function (app) {
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.post('/api/course/:courseId/section', createSection);

  var sectionModel = require('../models/section/section.model.server');

    function findSectionsForCourse(req, res) {
        var courseId = req.params.courseId;
        sectionModel.findSectionsForCourse(courseId)
            .then(sections =>
                res.json(sections));
    }

    function createSection(req, res) {
        var section = req.body;
        var user = req.session.currentUser;
        if (user && user.username !== 'admin') {
            sectionModel.createSection(section)
                .then(section =>
                    res.json(section));
        } else {
            res.send(404);
        }
    }
};