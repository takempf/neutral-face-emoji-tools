import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    host_permissions: ['*://*.slack.com/*']
  },
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  imports: false
});
