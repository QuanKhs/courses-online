const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class UserController {
    // [GET] user/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('user/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] user/recyclebin/courses
    recycleBin(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('user/recyclebin-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new UserController();
