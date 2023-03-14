const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4500;

nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    autoescape: true,
});
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = {
    go: require(path.join(__dirname, 'routes', 'go')),
    home: require(path.join(__dirname, 'routes', 'home')),
    clean: require(path.join(__dirname, 'routes', 'clean')),
    error: require(path.join(__dirname, 'routes', '404')),
};

app.use('/', router.home);
app.use('/go', router.go);
app.use('/clean', router.clean);
app.use('*', router.error);

app.listen(port, () => {
    console.log(
        `The application is currently listening at: http://localhost:${port}`,
    );
});

require(path.join(__dirname, 'gencss'));
