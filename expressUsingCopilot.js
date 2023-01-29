// create an express server
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 8000;

app.get('/', (req, res) => {
    res.send('This is todo app!!!!!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
