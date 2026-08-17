# Court of Love ❤

A playful, romantic, mobile-friendly apology website built as a static interactive story. The defendant pleads for forgiveness, faces a few affectionate courtroom questions, and ends with a dinner invitation.

## Features

- Interactive apology experience
- Moving NO button
- Romantic question flow
- Dinner invitation
- Confetti celebration
- EmailJS notification hook
- GitHub Pages deployment workflow
- Easy personalization in `script.js`

## Local Development

Run a local static server from this folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Personalization

Edit the configuration near the top of `script.js`:

```js
const APP_CONFIG = {
  boyfriendName: "Your Boyfriend",
  girlfriendName: "My Love"
};
```

## EmailJS Configuration

The site works even when EmailJS is not configured. If configuration is missing or sending fails, the success screen still appears and the browser console logs the issue.

To enable email notifications:

1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Add your Gmail or preferred email service in the EmailJS dashboard.
3. Create an email template.
4. Get your Public Key, Service ID, and Template ID.
5. Put those values in `script.js`:

```js
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};
```

6. In your EmailJS template, use variables such as `{{subject}}`, `{{message}}`, `{{boyfriend_name}}`, and `{{girlfriend_name}}`.
7. Test locally before sharing the deployed link.

Do not put Gmail passwords, app passwords, private API secrets, or other private credentials in this frontend.

## GitHub Pages

This project includes `.github/workflows/deploy.yml`, which deploys the static site to GitHub Pages from the `main` branch.

After pushing to GitHub:

1. Open the repository settings.
2. Go to Pages.
3. Make sure the source is GitHub Actions.
4. Wait for the deploy workflow to finish.
5. Visit:

```text
https://YOUR_GITHUB_USERNAME.github.io/court-of-love/
```

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml
```
