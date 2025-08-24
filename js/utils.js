/**
 * 工具函数库 - 优化版本
 * 重构亮点：
 * 1. 函数式编程风格
 * 2. 性能优化
 * 3. 错误处理增强
 * 4. 类型检查
 * 5. 缓存机制
 */

// 性能监控工具
const PerformanceMonitor = {
  marks: new Map(),
  
  start(name) {
    this.marks.set(name, performance.now());
  },
  
  end(name) {
    const start = this.marks.get(name);
    if (start) {
      const duration = performance.now() - start;
      this.marks.delete(name);
      if (duration > 16) { // 超过一帧的时间
        console.warn(`${name} 执行时间: ${duration.toFixed(2)}ms`);
      }
      return duration;
    }
    return 0;
  }
};

// 防抖函数 - 优化版
const debounce = (func, wait, immediate = false) => {
  let timeoutId;
  let lastCallTime;
  
  return function debounced(...args) {
    const context = this;
    const now = Date.now();
    
    const execute = () => {
      lastCallTime = now;
      return func.apply(context, args);
    };
    
    const later = () => {
      const elapsed = Date.now() - lastCallTime;
      if (elapsed >= wait) {
        if (!immediate) execute();
      } else {
        timeoutId = setTimeout(later, wait - elapsed);
      }
    };
    
    clearTimeout(timeoutId);
    
    if (immediate && !timeoutId) {
      return execute();
    }
    
    lastCallTime = now;
    timeoutId = setTimeout(later, wait);
  };
};

// 节流函数 - 优化版
const throttle = (func, limit, options = {}) => {
  let timeoutId;
  let lastExecTime = 0;
  let lastCallTime = 0;
  let lastArgs;
  let lastThis;
  
  const { leading = true, trailing = true } = options;
  
  return function throttled(...args) {
    const now = Date.now();
    const elapsed = now - lastExecTime;
    
    lastArgs = args;
    lastThis = this;
    lastCallTime = now;
    
    if (!lastExecTime && !leading) {
      lastExecTime = now;
    }
    
    if (elapsed >= limit) {
      lastExecTime = now;
      return func.apply(this, args);
    }
    
    if (trailing && !timeoutId) {
      timeoutId = setTimeout(() => {
        lastExecTime = leading ? Date.now() : 0;
        timeoutId = null;
        func.apply(lastThis, lastArgs);
      }, limit - elapsed);
    }
  };
};

// 视口检测 - 优化版
const isInViewport = (element, options = {}) => {
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    return false;
  }
  
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null
  } = options;
  
  if (window.IntersectionObserver) {
    return new Promise(resolve => {
      const observer = new IntersectionObserver(entries => {
        resolve(entries[0].isIntersecting);
        observer.disconnect();
      }, { threshold, rootMargin, root });
      observer.observe(element);
    });
  }
  
  // 降级方案
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top <= windowHeight * (1 + threshold) &&
    rect.bottom >= -windowHeight * threshold &&
    rect.left <= windowWidth * (1 + threshold) &&
    rect.right >= -windowWidth * threshold
  );
};

// 安全的DOM查询
const safeQuery = (selector, context = document) => {
  if (typeof selector !== 'string') return selector;
  
  try {
    const element = context.querySelector(selector);
    return element || null;
  } catch (error) {
    console.warn(`[DOM Query Error] 无效选择器: ${selector}`, error);
    return null;
  }
};

const safeQueryAll = (selector, context = document) => {
  if (typeof selector !== 'string') return Array.from(selector);
  
  try {
    return Array.from(context.querySelectorAll(selector));
  } catch (error) {
    console.warn(`[DOM Query Error] 无效选择器: ${selector}`, error);
    return [];
  }
};

// 缓存工具
const Cache = {
  storage: new Map(),
  
  set(key, value, ttl = 300000) { // 默认5分钟TTL
    this.storage.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  },
  
  get(key) {
    const item = this.storage.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.storage.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  clear() {
    this.storage.clear();
  },
  
  size() {
    return this.storage.size;
  }
};

// 事件委托优化
const createEventDelegate = (parent, eventType, selector, handler) => {
  const element = safeQuery(parent);
  if (!element) return null;
  
  const listener = (event) => {
    const target = event.target.closest(selector);
    if (target && element.contains(target)) {
      handler.call(target, event);
    }
  };
  
  element.addEventListener(eventType, listener);
  return () => element.removeEventListener(eventType, listener);
};

// 配置对象 - 使用代理模式优化
const CONFIG = new Proxy({
  scrollThreshold: 300,
  animationDelay: 100,
  mobileBreakpoint: 768,
  debounceDelay: 150,
  throttleLimit: 100,
  cacheTTL: 300000
}, {
  set(target, property, value) {
    if (typeof value !== 'number' || value < 0) {
      console.warn(`[Config] 无效配置值: ${property} = ${value}`);
      return false;
    }
    target[property] = value;
    return true;
  }
});

// 工具函数集合
const Utils = {
  // 防抖
  debounce,
  
  // 节流
  throttle,
  
  // 视口检测
  isInViewport,
  
  // DOM查询
  query: safeQuery,
  queryAll: safeQueryAll,
  
  // 事件委托
  delegate: createEventDelegate,
  
  // 缓存
  cache: Cache,
  
  // 性能监控
  perf: PerformanceMonitor,
  
  // 类型检查
  isElement: (obj) => obj instanceof Element,
  isString: (obj) => typeof obj === 'string',
  isFunction: (obj) => typeof obj === 'function',
  
  // 设备检测
  isMobile: () => window.innerWidth <= CONFIG.mobileBreakpoint,
  isTouch: () => 'ontouchstart' in window,
  
  // 动画帧优化
  raf: (callback) => {
    if (typeof requestAnimationFrame === 'function') {
      return requestAnimationFrame(callback);
    }
    return setTimeout(callback, 16);
  },
  
  // 取消动画帧
  caf: (id) => {
    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(id);
    } else {
      clearTimeout(id);
    }
  }
};

// 导出兼容处理
const exportUtils = () => {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, CONFIG, Cache, PerformanceMonitor };
  }
  
  if (typeof window !== 'undefined') {
    window.Utils = Utils;
    window.CONFIG = CONFIG;
    window.Cache = Cache;
  }
};

// 自动导出
exportUtils();

// ES6模块导出
export { Utils, CONFIG, Cache, PerformanceMonitor };