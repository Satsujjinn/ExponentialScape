const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(compression());
app.use(helmet());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
