const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

// INIT MIDDLEWARE
// app.use(logger);

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// HOMEPAGE ROUTE
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    });
})

// HANDLEBARS ENGINE
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// SET A STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// MEMBERS API ROUTES
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));