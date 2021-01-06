const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class UserController {
    // [GET] user/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        // if(req.query.hasOwnProperty('_sort')){
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: req.query.type,
        //     })
        // }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('user/stored-courses', {
                    deleteCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
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
