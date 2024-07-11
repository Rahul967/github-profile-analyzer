const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const { analyzeProfile } = require('./services/analyzeProfile');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  const username = url.split('github.com/')[1];
  const profileData = await fetch(`https://api.github.com/users/${username}`).then(res => res.json());
  const result = await analyzeProfile(profileData, username);
  res.json(result);
});



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
