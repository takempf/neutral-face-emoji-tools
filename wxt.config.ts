import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    host_permissions: ['*://*.slack.com/*']
  },
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte', '@wxt-dev/auto-icons'],
  imports: false
});
