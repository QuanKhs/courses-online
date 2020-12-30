const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./courses');
const userRouter = require('./user');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/user', userRouter);

    app.use('/', siteRouter);
}

module.exports = route;
