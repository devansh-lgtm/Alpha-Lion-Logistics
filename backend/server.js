require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const formsRouter = require('./src/routes/forms');
const { verify, isConfigured } = require('./src/lib/mailer');

const app = express();
const PORT = process.env.PORT || 5000;

const origins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / server-to-server requests with no Origin header.
      if (!origin || origins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
  }),
);
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mail: isConfigured ? 'configured' : 'not configured' });
});

app.use('/api', formsRouter);

app.use((req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') return res.status(403).json({ ok: false, error: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
  console.error(err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

app.listen(PORT, async () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  try {
    const { configured } = await verify();
    console.log(configured ? '[mailer] SMTP connection verified.' : '[mailer] SMTP not configured – submissions will be logged to the console.');
  } catch (err) {
    console.error('[mailer] SMTP verification failed:', err.message);
  }
});
