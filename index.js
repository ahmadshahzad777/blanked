const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 4500;

nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    autoescape: true,
});
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

const router = {
    home: require(path.join(__dirname, 'routes', 'home')),
    clean: require(path.join(__dirname, 'routes', 'clean')),
    error: require(path.join(__dirname, 'routes', '404')),
};

app.use('/', router.home);
app.use('/clean', router.clean);
app.use('*', router.error);

app.listen(port, () => {
    console.log(
        `The application is currently listening at: http://localhost:${port}`,
    );
});

require(path.join(__dirname, 'gencss'));
