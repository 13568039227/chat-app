// ========== API设置界面美化 ==========
// 独立模块：当 state.globalSettings.apiStyleBeautify 开启时，
// 为 #api-settings-screen 添加 api-scheme-2 类名，动态加载美化CSS

(function() {
  'use strict';

  let styleEl = null;
  let observerInitialized = false;

  function applyApiStyleBeautify() {
    const enabled = state.globalSettings.apiStyleBeautify || false;
    const screen = document.getElementById('api-settings-screen');
    if (!screen) return;

    if (enabled) {
      screen.classList.add('api-scheme-2');
      // 初始化界面切换监听
      initScreenObserver();
      // 如果当前就在API设置界面，立即加载CSS
      if (screen.classList.contains('active')) {
        loadStyleSheet();
      }
    } else {
      screen.classList.remove('api-scheme-2');
      removeStyleSheet();
    }
  }

  function initScreenObserver() {
    if (observerInitialized) return;
    observerInitialized = true;

    // 监听API设置界面的显示/隐藏
    const observer = new MutationObserver((mutations) => {
      const apiScreen = document.getElementById('api-settings-screen');
      if (!apiScreen || !state.globalSettings.apiStyleBeautify) return;

      // 检查是否切换到API设置界面
      if (apiScreen.classList.contains('active')) {
        loadStyleSheet();
      } else {
        // 离开API设置界面时卸载CSS，避免污染其他界面
        removeStyleSheet();
      }
    });

    // 观察整个文档的class变化
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  function loadStyleSheet() {
    if (styleEl) return;
    styleEl = document.createElement('link');
    styleEl.rel = 'stylesheet';
    styleEl.href = 'style-scheme-2.css?v=0.0.37';
    styleEl.id = 'api-style-beautify-css';
    document.head.appendChild(styleEl);
  }

  function removeStyleSheet() {
    if (styleEl) {
      styleEl.remove();
      styleEl = null;
    }
  }

  // 暴露给全局
  window.applyApiStyleBeautify = applyApiStyleBeautify;
})();
