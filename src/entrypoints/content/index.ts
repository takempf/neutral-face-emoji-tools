import './style.css';

import { createIntegratedUi, defineContentScript } from '#imports';
import { mount } from 'svelte';

import App from '../../components/App.svelte';

export default defineContentScript({
  matches: ['*://*.slack.com/*/emoji*'],
  runAt: 'document_idle',
  registration: 'manifest',

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: '.p-customize_emoji_wrapper',
      append: 'before',
      onMount: (container) => {
        mount(App, {
          target: container
        });
      }
    });

    ui.autoMount();
  }
});
