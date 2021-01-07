const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
const morgan = require('morgan');
const methodOverride = require('method-override');
//Connect to DB
db.connect();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//custom middleware
app.use(SortMiddleware);

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa fa-sort',
                    asc: 'fa fa-sort-amount-down',
                    desc: 'fa fa-sort-amount-up',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <i class="${icon}"></i>
                        </a>`;
            },
        },
    }),
);

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`My App listening at http://localhost:${port}`);
});
