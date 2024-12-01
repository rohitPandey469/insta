import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = 'your-instagram-user-id'; // Replace with logged-in user's ID
  const accessToken = 'your-access-token'; // Replace with user's access token

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
          headers: { Authorization: accessToken },
        });
        setMessages(response.data.messages); // Adjust based on API response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, accessToken]);

  const sendMessage = async () => {
    if (!recipientId || !newMessage) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/messages/${userId}`,
        { recipientId, message: newMessage },
        { headers: { Authorization: accessToken } }
      );
      alert('Message sent successfully!');
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div>
      <h1>Inbox</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>From:</strong> {msg.sender} <br />
            <strong>Message:</strong> {msg.text}
          </li>
        ))}
      </ul>
      <h2>Send Message</h2>
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      />
      <textarea
        placeholder="Type your message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Dashboard;
