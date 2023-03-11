const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 4500;

const router = {
    home: require(path.join(__dirname, 'routes', 'home')),
    error: require(path.join(__dirname, 'routes', '404')),
};

app.use('/', router.home);
app.use('*', router.error);

app.listen(port, () => {
    console.log(
        `The application is currently listening at: http://localhost:${port}`,
    );
});
