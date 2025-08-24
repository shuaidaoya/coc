// 无障碍性增强类
export class AccessibilityEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSkipLinks();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }
    
    setupSkipLinks() {
        // 添加跳过导航链接
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
        skipLink.textContent = '跳到主要内容';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    setupKeyboardNavigation() {
        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');});
    }
    
    setupFocusManagement() {// 焦点管理
        const focusableElements = utils.safeQuerySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });
    }
    
    setupScreenReaderSupport() {
        // 为动态内容添加屏幕阅读器支持
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.enhanceAccessibility(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    enhanceAccessibility(element) {
        // 为图片添加alt属性
        const images = element.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            if (!img.alt) {
                img.alt = '图片';
            }
        });
        
        // 为按钮添加aria-label
        const buttons = element.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', '按钮');
            }
        });
    }
}