/**
 * 动画引擎模块
 * 提供高性能的交互动画
 */
import { Utils, CONFIG } from '../utils.js';

export class AnimationEngine {
  constructor() {
    this.observers = new Map();
    this.animations = new Map();
    this.isPaused = false;
    this.frameId = null;
  }

  async init() {
    this.setupScrollAnimations();
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
  }

  setupScrollAnimations() {
    const animatedElements = Utils.queryAll('[data-animation]');
    
    animatedElements.forEach(element => {
      const animationType = element.dataset.animation;
      const delay = parseInt(element.dataset.delay) || 0;
      const duration = parseInt(element.dataset.duration) || 600;
      
      this.animations.set(element, {
        type: animationType,
        delay,
        duration,
        triggered: false
      });
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: [0, 0.1, 0.5, 1],
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      if (this.isPaused) return;
      
      entries.forEach(entry => {
        const animation = this.animations.get(entry.target);
        if (!animation) return;

        if (entry.isIntersecting && !animation.triggered) {
          this.triggerAnimation(entry.target, animation);
        }
      });
    }, observerOptions);

    this.observers.set('intersection', observer);
    
    // 观察所有动画元素
    this.animations.forEach((_, element) => {
      observer.observe(element);
    });
  }

  triggerAnimation(element, animation) {
    animation.triggered = true;
    
    Utils.raf(() => {
      setTimeout(() => {
        element.classList.add('animate-in');
        element.style.animationDuration = `${animation.duration}ms`;
        
        // 清理动画类
        setTimeout(() => {
          element.classList.remove('animate-in');
        }, animation.duration);
      }, animation.delay);
    });
  }

  setupParallaxEffects() {
    const parallaxElements = Utils.queryAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    const handleParallax = Utils.throttle(() => {
      if (this.isPaused) return;
      
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 16);

    window.addEventListener('scroll', handleParallax, { passive: true });
    this.observers.set('parallax', handleParallax);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  async destroy() {
    this.observers.forEach(observer => {
      if (typeof observer === 'function') {
        window.removeEventListener('scroll', observer);
      } else {
        observer.disconnect();
      }
    });
    
    this.observers.clear();
    this.animations.clear();
  }
}