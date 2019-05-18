const express = require('express');
const app = express();
var path = require('path');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});