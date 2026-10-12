# Alpha Lion Logistics – Backend

Express API that receives the website's **Request a Quote** and **Contact Us** forms, validates them, and emails them to the company inbox (with an automatic confirmation to the shipper).

## Setup

```bash
cp .env.example .env   # then fill in SMTP + COMPANY_EMAIL
npm install
npm run dev            # http://localhost:5000
```

Gmail / Google Workspace: enable 2-step verification, create an **App Password**, and use it as `SMTP_PASS` with `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`.

If SMTP is left blank the server still runs; submissions are printed to the console instead of being sent.

## Endpoints

| Method | Path           | Body                                                                                                         |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/health`  | –                                                                                                            |
| POST   | `/api/quote`   | `name, company, email, phone, origin, destination, equipment, service?, pickupDate?, weight?, commodity?, details` |
| POST   | `/api/contact` | `name, company, email, phone, subject?, message`                                                             |

Responses: `{ ok: true, delivered: boolean }` or `{ ok: false, error, errors? }`.
Rate limit: 10 submissions / 15 min per IP. A hidden `website` honeypot field silently rejects bots.
