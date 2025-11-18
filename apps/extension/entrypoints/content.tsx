export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Gemini Code Reviewer content script loaded');

    // Listen for selection requests from popup
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'GET_SELECTION') {
        const selection = window.getSelection()?.toString() || '';
        sendResponse({ text: selection });
      }
      return true;
    });

    // Detect code blocks on page
    const codeBlocks = document.querySelectorAll('pre code, .highlight, .code-block');

    // Add "Review with Gemini" button to each code block
    codeBlocks.forEach((block) => {
      if (block.parentElement && !block.parentElement.querySelector('.gemini-review-btn')) {
        const btn = document.createElement('button');
        btn.className = 'gemini-review-btn';
        btn.textContent = '✨ Review with Gemini';
        btn.style.cssText = `
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 6px 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
          transition: all 0.2s;
        `;

        btn.onmouseover = () => {
          btn.style.transform = 'scale(1.05)';
          btn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.6)';
        };

        btn.onmouseout = () => {
          btn.style.transform = 'scale(1)';
          btn.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.4)';
        };

        btn.onclick = () => {
          const code = block.textContent || '';
          browser.runtime.sendMessage({
            type: 'REVIEW_CODE',
            code,
            language: detectLanguage(block)
          });
          browser.sidePanel.open({});
        };

        // Make parent relative for absolute positioning
        if (block.parentElement.style.position !== 'absolute') {
          block.parentElement.style.position = 'relative';
        }

        block.parentElement.appendChild(btn);
      }
    });

    // Detect language from class names
    function detectLanguage(element: Element): string {
      const classes = element.className;
      const langMap: Record<string, string> = {
        javascript: 'javascript',
        typescript: 'typescript',
        python: 'python',
        java: 'java',
        go: 'go',
        rust: 'rust',
        php: 'php',
        ruby: 'ruby',
        csharp: 'csharp',
        cpp: 'cpp'
      };

      for (const [key, value] of Object.entries(langMap)) {
        if (classes.includes(key) || classes.includes(`language-${key}`)) {
          return value;
        }
      }

      return 'javascript'; // default
    }

    // GitHub-specific integration
    if (window.location.hostname === 'github.com') {
      injectGitHubIntegration();
    }
  }
});

function injectGitHubIntegration() {
  // Wait for GitHub to load
  const observer = new MutationObserver(() => {
    // Add "Review with Gemini" button to PR file diffs
    const fileHeaders = document.querySelectorAll('.file-header');

    fileHeaders.forEach((header) => {
      if (!header.querySelector('.gemini-pr-review-btn')) {
        const btn = document.createElement('button');
        btn.className = 'gemini-pr-review-btn btn btn-sm';
        btn.innerHTML = '✨ Review with Gemini';
        btn.style.cssText = `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          margin-left: 8px;
          font-weight: 600;
        `;

        btn.onclick = () => {
          // Get the file diff
          const fileContent = header.closest('.file')?.querySelector('.blob-code');
          if (fileContent) {
            const code = fileContent.textContent || '';
            browser.runtime.sendMessage({
              type: 'REVIEW_CODE',
              code,
              language: 'javascript' // TODO: detect from file extension
            });
            browser.sidePanel.open({});
          }
        };

        const actions = header.querySelector('.file-actions');
        if (actions) {
          actions.appendChild(btn);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
