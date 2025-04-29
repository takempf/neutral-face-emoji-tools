import { defineWebExtConfig } from 'wxt';

import { config } from './config';

export default defineWebExtConfig({
  startUrls: [config.emojiConfigUrl],
  binaries: {
    chrome: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Use Chrome Beta instead of regular Chrome
    firefox:
      '/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox' // Use Firefox Developer Edition instead of regular Firefox
  }
});
