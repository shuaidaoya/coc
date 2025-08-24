/**
 * 主应用入口 - 重构版本
 * 重构亮点：
 * 1. 模块化架构
 * 2. 依赖注入
 * 3. 错误边界
 * 4. 性能监控
 * 5. 生命周期管理
 */

import { Utils, CONFIG, Cache, PerformanceMonitor } from './utils.js';
import { AccessibilityManager } from './modules/AccessibilityManager.js';
import { MemberManager } from './modules/MemberManager.js';
import { NavigationManager } from './modules/NavigationManager.js';
import { AnimationEngine } from './modules/AnimationEngine.js';
import { FormHandler } from './modules/FormHandler.js';
import { PerformanceOptimizer } from './modules/PerformanceOptimizer.js';
import { ErrorBoundary } from './modules/ErrorBoundary.js';

// 应用配置
const APP_CONFIG = {
  debug: CONFIG.debug || false,
  features: {
    animations: true,
    lazyLoading: true,
    accessibility: true,
    serviceWorker: false,
    errorTracking: true
  },
  performance: {
    animationFrame: 16,
    debounceDelay: 150,
    throttleLimit: 100,
    cacheTTL: 300000
  }
};

// 应用生命周期管理器
class AppLifecycle {
  constructor() {
    this.modules = new Map();
    this.initialized = false;
    this.destroyed = false;
  }

  register(name, module) {
    if (this.modules.has(name)) {
      console.warn(`模块 ${name} 已存在，将被覆盖`);
    }
    this.modules.set(name, module);
    return this;
  }

  async initialize() {
    if (this.initialized) return;
    
    PerformanceMonitor.start('app-initialization');
    
    try {
      // 按依赖顺序初始化模块
      const initializationOrder = [
        'errorBoundary',
        'performanceOptimizer',
        'accessibilityManager',
        'navigationManager',
        'animationEngine',
        'memberManager',
        'formHandler'
      ];

      for (const moduleName of initializationOrder) {
        const module = this.modules.get(moduleName);
        if (module && typeof module.init === 'function') {
          await module.init();
          if (APP_CONFIG.debug) {
            console.log(`✅ ${moduleName} 初始化完成`);
          }
        }
      }

      this.initialized = true;
      const initTime = PerformanceMonitor.end('app-initialization');
      
      console.log(`%c🎮 文苑阁部落网站已启动`, 
        'color: #3b82f6; font-size: 20px; font-weight: bold;');
      console.log(`%c初始化耗时: ${initTime.toFixed(2)}ms`, 
        'color: #10b981; font-size: 14px;');
      
    } catch (error) {
      console.error('应用初始化失败:', error);
      this.handleInitializationError(error);
    }
  }

  async destroy() {
    if (this.destroyed) return;
    
    for (const [name, module] of this.modules) {
      if (typeof module.destroy === 'function') {
        await module.destroy();
      }
    }
    
    this.modules.clear();
    this.destroyed = true;
  }

  handleInitializationError(error) {
    document.body.innerHTML = `
      <div class="error-screen">
        <h1>系统初始化失败</h1>
        <p>请刷新页面重试</p>
        <button onclick="location.reload()">刷新页面</button>
      </div>
    `;
  }

  getModule(name) {
    return this.modules.get(name);
  }
}

// 全局应用实例
const App = new AppLifecycle();

// 模块定义
const modules = {
  // 错误边界
  errorBoundary: new ErrorBoundary(),
  
  // 性能优化器
  performanceOptimizer: new PerformanceOptimizer(),
  
  // 无障碍管理器
  accessibilityManager: new AccessibilityManager(),
  
  // 导航管理器
  navigationManager: new NavigationManager(),
  
  // 动画引擎
  animationEngine: new AnimationEngine(),
  
  // 成员管理器
  memberManager: new MemberManager(),
  
  // 表单处理器
  formHandler: new FormHandler()
};

// 注册所有模块
Object.entries(modules).forEach(([name, module]) => {
  App.register(name, module);
});

// 服务工作者注册
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && APP_CONFIG.features.serviceWorker) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker 注册成功:', registration);
    } catch (error) {
      console.warn('Service Worker 注册失败:', error);
    }
  }
};

// 页面可见性管理
const setupVisibilityAPI = () => {
  if ('visibilityState' in document) {
    let hiddenStart = null;
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        hiddenStart = Date.now();
        document.title = '👋 文苑阁部落 - 记得回来看看！';
        
        // 暂停非关键动画
        App.getModule('animationEngine')?.pause();
      } else {
        document.title = '部落冲突 - 文苑阁';
        
        if (hiddenStart) {
          const hiddenDuration = Date.now() - hiddenStart;
          console.log(`页面隐藏了 ${hiddenDuration}ms`);
          
          // 恢复动画
          App.getModule('animationEngine')?.resume();
        }
      }
    });
  }
};

// 性能监控
const setupPerformanceMonitoring = () => {
  if (APP_CONFIG.features.errorTracking) {
    // 错误监控
    window.addEventListener('error', (event) => {
      console.error('运行时错误:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('未处理的Promise拒绝:', event.reason);
    });
  }

  // 性能指标
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('页面性能指标:', {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        ttfb: perfData.responseStart - perfData.requestStart,
        totalTime: perfData.loadEventEnd - perfData.navigationStart
      });
    }, 0);
  });
};

// 热重载支持（开发模式）
const setupHotReload = () => {
  if (APP_CONFIG.debug && 'WebSocket' in window) {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      if (event.data === 'reload') {
        location.reload();
      }
    };
  }
};

// 初始化应用
const initializeApp = async () => {
  try {
    // 设置全局访问
    window.App = App;
    window.APP_CONFIG = APP_CONFIG;
    
    // 设置各种功能
    setupVisibilityAPI();
    setupPerformanceMonitoring();
    
    // 注册服务工作者
    await registerServiceWorker();
    
    // 设置热重载
    setupHotReload();
    
    // 初始化所有模块
    await App.initialize();
    
    // 添加加载完成标记
    document.documentElement.classList.add('app-loaded');
    
  } catch (error) {
    console.error('应用启动失败:', error);
  }
};

// 启动策略
const startupStrategy = () => {
  // 立即执行的关键代码
  document.documentElement.classList.add('js-enabled');
  
  // 延迟执行的非关键代码
  const deferredTasks = [
    () => import('./modules/Analytics.js').then(m => m.default?.()),
    () => import('./modules/SocialShare.js').then(m => m.default?.())
  ];
  
  // 使用 requestIdleCallback 延迟执行
  const runDeferred = () => {
    deferredTasks.forEach(task => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(task, { timeout: 1000 });
      } else {
        setTimeout(task, 100);
      }
    });
  };
  
  // 初始化完成后执行延迟任务
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp().then(runDeferred);
  });
};

// 启动应用
startupStrategy();

// 导出给测试使用
export { App, APP_CONFIG };