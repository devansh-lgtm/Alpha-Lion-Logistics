const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { quoteSchema, contactSchema } = require('../lib/validation');
const { deliver } = require('../lib/mailer');

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many submissions. Please try again in a few minutes.' },
});

function handle(kind, schema) {
  return async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] || 'form';
        const missing = issue.code === 'invalid_type' && issue.message.includes('undefined');
        if (!errors[key]) errors[key] = missing ? 'This field is required' : issue.message;
      }
      return res.status(422).json({ ok: false, error: 'Please correct the highlighted fields.', errors });
    }

    const { website, ...data } = parsed.data;
    // Honeypot tripped: pretend success so bots learn nothing.
    if (website) return res.json({ ok: true, delivered: false });

    const meta = {
      submittedAt: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' }),
      ip: req.ip,
    };

    try {
      const result = await deliver({ kind, data, meta });
      return res.json({ ok: true, ...result });
    } catch (err) {
      console.error(`[${kind}] delivery failed:`, err);
      return res.status(502).json({
        ok: false,
        error: 'We could not send your request right now. Please call us or try again shortly.',
      });
    }
  };
}

router.post('/quote', limiter, handle('quote', quoteSchema));
router.post('/contact', limiter, handle('contact', contactSchema));

module.exports = router;
