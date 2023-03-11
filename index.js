const express = require('express');

const app = express();
const port = process.env.PORT || 4500;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(
        `The application is currently listening at: http://localhost:${port}`,
    );
});
