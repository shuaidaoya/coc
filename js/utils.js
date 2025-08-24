/**
 * 工具函数库 - 优化版本
 */

// 安全的DOM查询函数
export const utils = {
  safeQuerySelector(selector) {
    try {
      const element = document.querySelector(selector);
      return element || null;
    } catch (error) {
      console.error(`查询选择器失败: ${selector}`, error);
      return null;
    }
  },
  
  safeQuerySelectorAll(selector) {
    try {
      const elements = document.querySelectorAll(selector);
      return elements || [];
    } catch (error) {
      console.error(`查询多元素选择器失败: ${selector}`, error);
      return [];
    }
  }
};

// 性能监控工具
export const PerformanceMonitor = {
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
export const debounce = (func, wait, immediate = false) => {
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
export const throttle = (func, limit, options = {}) => {
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

// 缓存机制
export const Cache = {
  data: new Map(),
  
  set(key, value, ttl = 300000) { // 默认5分钟
    this.data.set(key, { value, expiry: Date.now() + ttl });
  },
  
  get(key) {
    const item = this.data.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.data.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  has(key) {
    return this.get(key) !== null;
  },
  
  delete(key) {
    return this.data.delete(key);
  },
  
  clear() {
    this.data.clear();
  }
};

export const CONFIG = {
  debug: false,
  features: {
    animations: true,
    lazyLoading: true,
    accessibility: true
  }
};