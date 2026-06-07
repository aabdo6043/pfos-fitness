/**
 * Utility Functions Module
 * Common helper functions for the PFOS frontend
 */

const Utils = {
  /**
   * Format date to YYYY-MM-DD
   */
  formatDate: function(date) {
    if (typeof date === 'string') {
      return date;
    }
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + month + '-' + day;
  },
  
  /**
   * Format date to readable format
   */
  formatDateReadable: function(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(i18n.currentLanguage === 'ar' ? 'ar-SA' : 'en-US', options);
  },
  
  /**
   * Format time to HH:MM
   */
  formatTime: function(date) {
    if (typeof date === 'string') {
      return date;
    }
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return hours + ':' + minutes;
  },
  
  /**
   * Get time ago string (e.g., "2 hours ago")
   */
  getTimeAgo: function(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'just now';
    if (minutes < 60) return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
    if (hours < 24) return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    if (days < 7) return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    
    return this.formatDateReadable(date);
  },
  
  /**
   * Round number to specified decimal places
   */
  round: function(num, decimals = 2) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
  
  /**
   * Format number with thousand separator
   */
  formatNumber: function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  
  /**
   * Calculate percentage
   */
  calculatePercentage: function(current, target) {
    if (target === 0) return 0;
    return Math.min(100, (current / target) * 100);
  },
  
  /**
   * Validate email
   */
  validateEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  /**
   * Debounce function
   */
  debounce: function(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },
  
  /**
   * Throttle function
   */
  throttle: function(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  /**
   * Show notification
   */
  showNotification: function(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background-color: ${this.getNotificationColor(type)};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  },
  
  /**
   * Get notification color
   */
  getNotificationColor: function(type) {
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };
    return colors[type] || colors.info;
  },
  
  /**
   * Show loading spinner
   */
  showLoading: function(element) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = '<div class="spinner-border"></div>';
    element.appendChild(spinner);
  },
  
  /**
   * Hide loading spinner
   */
  hideLoading: function(element) {
    const spinner = element.querySelector('.spinner');
    if (spinner) spinner.remove();
  },
  
  /**
   * Get URL parameter
   */
  getUrlParameter: function(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
  },
  
  /**
   * Set URL parameter
   */
  setUrlParameter: function(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
  },
  
  /**
   * Local storage operations
   */
  storage: {
    set: function(key, value) {
      localStorage.setItem('pfos_' + key, JSON.stringify(value));
    },
    
    get: function(key) {
      const item = localStorage.getItem('pfos_' + key);
      return item ? JSON.parse(item) : null;
    },
    
    remove: function(key) {
      localStorage.removeItem('pfos_' + key);
    },
    
    clear: function() {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('pfos_')) {
          localStorage.removeItem(key);
        }
      });
    }
  },
  
  /**
   * Session storage operations
   */
  session: {
    set: function(key, value) {
      sessionStorage.setItem('pfos_' + key, JSON.stringify(value));
    },
    
    get: function(key) {
      const item = sessionStorage.getItem('pfos_' + key);
      return item ? JSON.parse(item) : null;
    },
    
    remove: function(key) {
      sessionStorage.removeItem('pfos_' + key);
    }
  },
  
  /**
   * Deep clone object
   */
  deepClone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  
  /**
   * Merge objects
   */
  merge: function(target, source) {
    return Object.assign({}, target, source);
  },
  
  /**
   * Check if object is empty
   */
  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },
  
  /**
   * Generate unique ID
   */
  generateId: function() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  },
  
  /**
   * Capitalize string
   */
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  /**
   * Truncate string
   */
  truncate: function(str, length = 50) {
    if (str.length <= length) return str;
    return str.substr(0, length) + '...';
  },
  
  /**
   * Convert bytes to human readable format
   */
  formatBytes: function(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },
  
  /**
   * Get current date
   */
  getCurrentDate: function() {
    return this.formatDate(new Date());
  },
  
  /**
   * Get date range
   */
  getDateRange: function(days) {
    const end = new Date();
    const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
    return {
      start: this.formatDate(start),
      end: this.formatDate(end)
    };
  },
  
  /**
   * Get week start date
   */
  getWeekStart: function(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return this.formatDate(new Date(d.setDate(diff)));
  },
  
  /**
   * Get month start date
   */
  getMonthStart: function(date = new Date()) {
    const d = new Date(date);
    return this.formatDate(new Date(d.getFullYear(), d.getMonth(), 1));
  },
  
  /**
   * Get month end date
   */
  getMonthEnd: function(date = new Date()) {
    const d = new Date(date);
    return this.formatDate(new Date(d.getFullYear(), d.getMonth() + 1, 0));
  }
};

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .spinner-border {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
