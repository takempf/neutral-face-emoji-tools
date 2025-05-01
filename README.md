## Neutral Face Emoji Tools

Drag and drop all your emoji.

![Demo GIF](demo.gif)

---

### Installation

This extension is available for:

- Google Chrome: https://chrome.google.com/webstore/detail/slack-emoji-tools/anchoacphlfbdomdlomnbbfhcmcdmjej
- Mozilla Firefox: https://addons.mozilla.org/en-US/firefox/addon/neutral-face-emoji-tools/

---

### Usage

To use this extension, simply navigate to the /customize/emoji page of your Slack organization. There should be a new section called "Bulk Emoji Uploader" under the "💁 Emoji" tab. Once there, just drag and drop the images you want into the drop zone.

**Note: Make sure your files are named appropriately before uploading them!**

---

### Building and Contributing

To work on this extension you'll need [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com/) installed.

The **package.json** file lists the project's dependencies. You'll need to run `npm install` to install those first.

For development and packaging, the extension **WXT** (https://wxt.dev/).

- `npm run dev` starts up a dev server and a browser to test the extension in. (for Chrome)
- `npm run build` builds the extension in to a static bundle (for Chrome)
- `npm run zip` buils the extension, then zips it up (for Chrome)

Each of these commands can also be run for Firefox—`npm run dev:firefox`, `npm run build:firefox`, and `npm run zip:firefox`.

For code style consistency, **Prettier** (https://prettier.io/) is used.
