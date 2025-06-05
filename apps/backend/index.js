const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

let views = 0;
const messages = [];

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post('/api/views', (req, res) => {
  views += 1;
  res.json({ views });
});

app.get('/api/views', (req, res) => {
  res.json({ views });
});

app.get('/api/messages', (req, res) => {
  res.json({ messages });
});

app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Message text required' });
  }
  const message = { id: Date.now(), text: text.trim(), timestamp: new Date().toISOString(), likes: 0 };
  messages.push(message);
  res.status(201).json(message);
});

app.post('/api/messages/:id/like', (req, res) => {
  const id = Number(req.params.id);
  const message = messages.find(m => m.id === id);
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  message.likes += 1;
  res.json(message);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
