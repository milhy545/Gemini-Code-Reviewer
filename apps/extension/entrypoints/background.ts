export default defineBackground(() => {
  console.log('Gemini Code Reviewer Extension loaded');

  // Create context menu item
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: 'review-code',
      title: 'Review with Gemini',
      contexts: ['selection']
    });
  });

  // Handle context menu clicks
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'review-code' && info.selectionText) {
      // Open side panel with selected text
      browser.sidePanel.open({ tabId: tab?.id });
      // Send selected text to side panel
      browser.runtime.sendMessage({
        type: 'SELECTED_CODE',
        code: info.selectionText
      });
    }
  });

  // Command to open side panel
  browser.commands.onCommand.addListener((command) => {
    if (command === 'open-sidepanel') {
      browser.sidePanel.open({});
    }
  });
});
