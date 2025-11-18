import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'Gemini Code Reviewer',
    description: 'AI-powered code review pomocí Google Gemini',
    version: '2.0.0',
    permissions: [
      'activeTab',
      'storage',
      'contextMenus',
      'sidePanel'
    ],
    host_permissions: [
      'https://github.com/*',
      'https://gitlab.com/*'
    ],
    icons: {
      16: '/icon-16.png',
      48: '/icon-48.png',
      128: '/icon-128.png'
    },
    commands: {
      'open-sidepanel': {
        suggested_key: {
          default: 'Ctrl+Shift+Y'
        },
        description: 'Otevřít Code Reviewer panel'
      }
    }
  },
  modules: ['@wxt-dev/module-react']
});
