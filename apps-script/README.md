Deploying the Court of Love Google Apps Script Web App

This folder contains a simple Google Apps Script (Code.gs) that accepts POST requests
from the Court of Love website and appends each completed session as a new row in a
Google Sheet.

Steps to deploy and configure

1. Create a Google Sheet
   - Create a new Google Sheet and note its Sheet ID from the URL:
     https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit#gid=0
   - (Optional) Add a header row. The Apps Script will add headers automatically if the sheet is empty.

2. Create a new Apps Script project
   - Go to https://script.google.com/
   - Click New project and replace the default Code.gs with the contents of apps-script/Code.gs from this repo.
   - Replace the placeholder SHEET_ID in Code.gs with your sheet ID:
     const SHEET_ID = 'YOUR_SHEET_ID_HERE';

3. Deploy the script as a Web App
   - In the Apps Script editor choose: Deploy > New deployment
   - Select "Web app"
   - Set "Description" as you like
   - Important: Under "Execute as" select: Me
   - Under "Who has access" choose: Anyone (even anonymous) — this allows the client website to POST without requiring sign-in. If you prefer more restriction, set to "Anyone with a Google account" and adjust accordingly.
   - Click Deploy and accept permissions. Copy the Web App URL.

4. Configure the website
   - Open script.js in the repository and set the GOOGLE_SHEET_WEB_APP_URL constant to the Web App URL you copied.
     const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/XXXXXXXXXX/exec";
   - Commit and push the change to the repo (the website will POST to this URL when the user completes the flow).

Notes and privacy
- The Apps Script only stores Timestamp, Session ID and the answers object fields. No emails, IPs, or other personal data are collected.
- Each completed session appends a new row — existing rows are never overwritten.
- If the sheet is unavailable or the POST fails, the website logs the error to the console and continues the user experience (no error messages shown to visitors).

If you want me to deploy the Apps Script for you, provide the Google Sheet ID and confirm you want the web app to be deployed as "Anyone (even anonymous)" and I can add the Web App URL to script.js and push the update.