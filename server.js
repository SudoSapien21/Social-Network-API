const express = require('express');
const mongoose = require('mongoose');
const routes = require('./api');

const app = express();
const PORT = process.env.PORT || 3001;
//app.use('api', routes); if this doesn't work, you'll have to add a routes/index.js like in the example
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 app.use(routes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
