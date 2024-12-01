const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware to validate access token
const validateToken = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
  }
  req.accessToken = accessToken;
  next();
};

// Fetch messages (inbox)
router.get('/:userId', validateToken, async (req, res) => {
  const { userId } = req.params;
  const { accessToken } = req;

  try {
    const response = await axios.get(`https://graph.instagram.com/${userId}/messages`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Unable to fetch messages' });
  }
});

// Send message
router.post('/:userId', validateToken, async (req, res) => {
  const { userId } = req.params;
  const { accessToken } = req;
  const { recipientId, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.instagram.com/${userId}/messages`,
      {
        recipient_id: recipientId,
        message,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ error: 'Unable to send message' });
  }
});

module.exports = router;
