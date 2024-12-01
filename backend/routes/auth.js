const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI;

router.get('/login', (req, res) => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    });

    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.user_id;

    // Store access token and userId securely
    res.json({ accessToken, userId });
  } catch (error) {
    console.error('Error fetching Instagram token:', error.message);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;
