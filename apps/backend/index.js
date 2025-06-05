const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss');

let views = 0;
const messages = [];
const contacts = [];

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : undefined;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors(allowedOrigins ? { origin: allowedOrigins } : {}));
if (process.env.NODE_ENV !== 'test') {
  app.use(limiter);
}
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

app.get('/api/metrics', (req, res) => {
  res.json({ views, messageCount: messages.length });
});

app.get('/api/messages', (req, res) => {
  let result = [...messages];
  if (req.query.sort === 'likes') {
    result.sort((a, b) => b.likes - a.likes);
  } else if (req.query.sort === 'new') {
    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
  res.json({ messages: result });
});

app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Message text required' });
  }
  const message = { id: Date.now(), text: xss(text.trim()), timestamp: new Date().toISOString(), likes: 0 };
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

app.delete('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }
  const [deleted] = messages.splice(index, 1);
  res.json(deleted);
});

app.get('/api/contact', (req, res) => {
  res.json({ contacts });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return res.status(400).json({ error: 'Name, email and message required' });
  }
  const entry = {
    id: Date.now(),
    name: xss(name.trim()),
    email: xss(email.trim()),
    message: xss(message.trim()),
    timestamp: new Date().toISOString(),
  };
  contacts.push(entry);
  res.status(201).json({ success: true });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
