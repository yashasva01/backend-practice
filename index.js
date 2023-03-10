const express = require('express');
const router = require('./router');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);
const port = 8000;
app.listen(port, () => {
    console.log(`server is running on port: localhost:${port}`);
});