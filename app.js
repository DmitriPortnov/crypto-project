const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.static('public'));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`app listened on port ${port}`)
});