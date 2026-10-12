const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  COMPANY_EMAIL,
  COMPANY_NAME = 'Alpha Lion Logistics',
} = process.env;

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && COMPANY_EMAIL);

let transporter = null;
if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: String(SMTP_SECURE).toLowerCase() !== 'false',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const escape = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const row = (label, value) =>
  value
    ? `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#111827;font-size:14px">${escape(value).replace(/\n/g, '<br/>')}</td></tr>`
    : '';

function layout(title, bodyRows, footerNote) {
  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f9fafb;padding:32px">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:#FFDD00;padding:20px 28px">
        <div style="font-weight:800;font-size:18px;color:#0f0f0f;letter-spacing:-0.01em">${COMPANY_NAME}</div>
        <div style="font-size:13px;color:#3f3f3f;margin-top:2px">${title}</div>
      </div>
      <table style="border-collapse:collapse;width:100%;padding:12px">${bodyRows}</table>
      <div style="padding:16px 28px;border-top:1px solid #f3f4f6;color:#9ca3af;font-size:12px">${footerNote}</div>
    </div>
  </div>`;
}

function quoteEmail(data, meta) {
  const rows = [
    row('Name', data.name),
    row('Company', data.company),
    row('Email', data.email),
    row('Phone', data.phone),
    row('Service', data.service),
    row('Equipment', data.equipment),
    row('Origin', data.origin),
    row('Destination', data.destination),
    row('Pickup date', data.pickupDate),
    row('Weight', data.weight),
    row('Commodity', data.commodity),
    row('Shipment details', data.details),
    row('Submitted', meta.submittedAt),
    row('IP', meta.ip),
  ].join('');

  return {
    subject: `New Quote Request: ${data.origin} → ${data.destination} (${data.equipment}) – ${data.company}`,
    html: layout('New Request a Quote submission', rows, 'Reply directly to this email to respond to the shipper.'),
    text: Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  };
}

function contactEmail(data, meta) {
  const rows = [
    row('Name', data.name),
    row('Company', data.company),
    row('Email', data.email),
    row('Phone', data.phone),
    row('Subject', data.subject),
    row('Message', data.message),
    row('Submitted', meta.submittedAt),
    row('IP', meta.ip),
  ].join('');

  return {
    subject: `New Contact Form Message – ${data.company || data.name}`,
    html: layout('New Contact Us submission', rows, 'Reply directly to this email to respond.'),
    text: Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  };
}

function autoReply(data, kind) {
  const isQuote = kind === 'quote';
  const body = `
    <tr><td style="padding:24px 28px;color:#111827;font-size:15px;line-height:1.6">
      Hi ${escape(data.name)},<br/><br/>
      Thanks for reaching out to ${COMPANY_NAME}. We've received your ${isQuote ? 'quote request' : 'message'} and a member of our team will follow up shortly, usually within one business hour during operating hours.<br/><br/>
      ${isQuote ? `<strong>Lane:</strong> ${escape(data.origin)} → ${escape(data.destination)}<br/><strong>Equipment:</strong> ${escape(data.equipment)}<br/><br/>` : ''}
      If your shipment is urgent, call us directly and reference this email.<br/><br/>
      — The ${COMPANY_NAME} Team
    </td></tr>`;
  return {
    subject: isQuote ? `We received your quote request – ${COMPANY_NAME}` : `We received your message – ${COMPANY_NAME}`,
    html: layout(isQuote ? 'Quote request received' : 'Message received', body, 'This is an automated confirmation. Please do not reply to this message.'),
  };
}

async function deliver({ kind, data, meta }) {
  const build = kind === 'quote' ? quoteEmail : contactEmail;
  const mail = build(data, meta);

  if (!transporter) {
    // Development fallback: nothing is sent, but the submission is logged so the flow can be tested.
    console.warn('[mailer] SMTP is not configured. Logging submission instead of sending.');
    console.log(JSON.stringify({ kind, data, meta }, null, 2));
    return { delivered: false };
  }

  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: COMPANY_EMAIL,
    replyTo: `${data.name} <${data.email}>`,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  });

  // Confirmation to the shipper. Failure here must not fail the request.
  try {
    const reply = autoReply(data, kind);
    await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: data.email,
      subject: reply.subject,
      html: reply.html,
    });
  } catch (err) {
    console.error('[mailer] auto-reply failed:', err.message);
  }

  return { delivered: true };
}

async function verify() {
  if (!transporter) return { configured: false };
  await transporter.verify();
  return { configured: true };
}

module.exports = { deliver, verify, isConfigured };
