/**
 * 导航管理模块
 * 处理所有导航相关功能
 */
import { Utils } from '../utils.js';

export class NavigationManager {
  constructor() {
    this.mobileMenu = null;
    this.activeSection = null;
    this.history = [];
  }

  async init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupActiveSection();
    this.setupKeyboardNavigation();
  }

  setupMobileMenu() {
    const menuButton = Utils.query('[aria-label="打开菜单"]');
    const mobileMenu = Utils.query('#mobile-menu');
    
    if (!menuButton || !mobileMenu) return;

    this.mobileMenu = {
      button: menuButton,
      menu: mobileMenu,
      isOpen: false
    };

    const toggleMenu = () => {
      this.mobileMenu.isOpen = !this.mobileMenu.isOpen;
      
      mobileMenu.classList.toggle('hidden', !this.mobileMenu.isOpen);
      menuButton.setAttribute('aria-expanded', this.mobileMenu.isOpen.toString());
      
      // 防止背景滚动
      document.body.classList.toggle('overflow-hidden', this.mobileMenu.isOpen);
    };

    menuButton.addEventListener('click', toggleMenu);
    
    // 点击菜单外部关闭
    document.addEventListener('click', (e) => {
      if (this.mobileMenu.isOpen && 
          !mobileMenu.contains(e.target) && 
          !menuButton.contains(e.target)) {
        toggleMenu();
      }
    });

    // ESC键关闭菜单
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenu.isOpen) {
        toggleMenu();
        menuButton.focus();
      }
    });
  }

  setupSmoothScroll() {
    const links = Utils.queryAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const target = Utils.query(`#${targetId}`);
        
        if (target) {
          this.scrollToSection(target);
          
          // 关闭移动菜单
          if (this.mobileMenu?.isOpen) {
            this.mobileMenu.button.click();
          }
        }
      });
    });
  }

  scrollToSection(target) {
    const headerOffset = 80;
    const elementPosition = target.offsetTop - headerOffset;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });

    // 更新URL
    history.pushState(null, null, `#${target.id}`);
    this.activeSection = target.id;
  }

  setupActiveSection() {
    const sections = Utils.queryAll('section[id]');
    
    const updateActiveSection = Utils.throttle(() => {
      const scrollY = window.scrollY;
      const headerOffset = 100;
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.id;
        }
      });
      
      if (current !== this.activeSection) {
        this.activeSection = current;
        this.updateNavigationHighlight();
      }
    }, 100);

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // 初始化
  }

  updateNavigationHighlight() {
    const navLinks = Utils.queryAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
      link.classList.toggle('active', 
        link.getAttribute('href') === `#${this.activeSection}`);
    });
  }

  setupKeyboardNavigation() {
    // Tab键导航优化
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  async destroy() {
    // 清理事件监听器
    this.mobileMenu = null;
    this.activeSection = null;
    this.history = [];
  }
}