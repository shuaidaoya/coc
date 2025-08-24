/**
 * 主应用入口 - 简化版
 */

import { utils, PerformanceMonitor, Cache, CONFIG } from './utils.js';
import { AnimationEngine } from './modules/AnimationEngine.js';
import { NavigationManager } from './modules/NavigationManager.js';
import { MembersRenderer } from './members.js';
import { MembersToggle } from './members.js';
import { MembersFilter } from './members.js';

// 应用配置
const APP_CONFIG = {
  debug: CONFIG.debug || false,
  features: {
    animations: true,
    lazyLoading: true,
    accessibility: true
  },
  performance: {
    animationFrame: 16,
    debounceDelay: 150,
    throttleLimit: 100,
    cacheTTL: 300000
  }
};

// 初始化成员管理相关功能
const initializeMemberManagement = () => {
  try {
    // 初始化成员渲染器
    const membersRenderer = new MembersRenderer();
    
    // 初始化成员折叠功能
    const membersToggle = new MembersToggle();
    if (membersToggle && membersRenderer.regularMembersContainer) {
      membersToggle.setRegularMembersContainer(membersRenderer.regularMembersContainer);
    }
    
    // 初始化成员过滤功能
    const membersFilter = new MembersFilter();
    if (membersFilter) {
      membersFilter.setMembersRenderer(membersRenderer);
    }
    
    if (APP_CONFIG.debug) {
      console.log('✅ 成员管理功能初始化完成');
    }
    
    return { membersRenderer, membersToggle, membersFilter };
  } catch (error) {
    console.error('成员管理功能初始化失败:', error);
    return null;
  }
};

// 初始化应用
const initializeApp = () => {
  try {
    PerformanceMonitor.start('app-initialization');
    
    // 设置全局访问
    window.App = {
      config: APP_CONFIG,
      utils,
      PerformanceMonitor,
      Cache
    };
    
    // 初始化导航管理器
    let navigationManager = null;
    try {
      navigationManager = new NavigationManager();
      if (typeof navigationManager.init === 'function') {
        navigationManager.init();
      }
    } catch (error) {
      console.warn('导航管理器初始化失败:', error);
    }
    
    // 初始化动画引擎
    let animationEngine = null;
    try {
      animationEngine = new AnimationEngine();
      if (typeof animationEngine.init === 'function') {
        animationEngine.init();
      }
    } catch (error) {
      console.warn('动画引擎初始化失败:', error);
    }
    
    // 初始化成员管理
    const memberManagement = initializeMemberManagement();
    
    // 性能监控
    const initTime = PerformanceMonitor.end('app-initialization');
    console.log(`%c🎮 文苑阁部落网站已启动`, 
      'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log(`%c初始化耗时: ${initTime.toFixed(2)}ms`, 
      'color: #10b981; font-size: 14px;');
    
    // 添加加载完成标记
    document.documentElement.classList.add('app-loaded');
    
  } catch (error) {
    console.error('应用启动失败:', error);
    document.body.innerHTML = `
      <div class="error-screen flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 class="text-4xl font-bold mb-4">系统初始化失败</h1>
        <p class="text-xl mb-6">请刷新页面重试</p>
        <button onclick="location.reload()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
          刷新页面
        </button>
      </div>
    `;
  }
};

// 启动策略
const startupStrategy = () => {
  // 立即执行的关键代码
  document.documentElement.classList.add('js-enabled');
  
  // 初始化完成后执行延迟任务
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
  });
};

// 启动应用
startupStrategy();

// 导出给测试使用
export { APP_CONFIG };