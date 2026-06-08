/**
 * Main Application Script
 * Handles page navigation, dashboard functionality, and user interactions
 */

const App = {
  currentUser: null,
  currentPage: 'dashboard',
  
  /**
   * Initialize the application
   */
init: function() {
    // أضف هذا السطر أولاً
    API.init('https://script.google.com/macros/s/AKfycbxnOD-T4yBlQgGjZin55sL5IM9VExQSqiI1QaNiaGku-bysAakkjNL_6JD34xAbzCYebw/exec');
    
    this.setupEventListeners();
    this.loadUserData();
    this.loadDashboardData();

  },
  
  /**
   * Setup event listeners
   */
  setupEventListeners: function() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        this.navigateTo(page);
      });
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Language toggle
    document.getElementById('languageToggle').addEventListener('click', () => {
      i18n.toggleLanguage();
    });
    
    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.showSettings();
    });
    
    // Close settings modal
    document.getElementById('closeSettings').addEventListener('click', () => {
      document.getElementById('settingsModal').style.display = 'none';
    });
    
    // Sidebar toggle on mobile
    document.getElementById('sidebarToggle').addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // Status checkboxes
    document.querySelectorAll('.status-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.handleStatusChange(e.target);
      });
    });
    
    // Close sidebar when clicking on a nav link on mobile
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          document.querySelector('.sidebar').classList.remove('active');
        });
      });
    }
  },
  
  /**
   * Navigate to a page
   */
  navigateTo: function(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
    });
    
    // Show selected page
    const pageElement = document.getElementById(page + '-page');
    if (pageElement) {
      pageElement.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${page}"]`);
    if (activeLink) {
      activeLink.closest('.nav-item').classList.add('active');
    }
    
    // Update page title
    const titleKey = 'nav_' + page;
    document.querySelector('.page-title').setAttribute('data-i18n', titleKey);
    document.querySelector('.page-title').textContent = i18n.t(titleKey);
    
    this.currentPage = page;
    
    // Load page-specific data
    this.loadPageData(page);
  },
  
  /**
   * Load user data
   */
  loadUserData: function() {
    // For now, use mock data
    this.currentUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Fitness Enthusiast',
      email: 'user@example.com',
      targetWeight: 80,
      targetBodyFat: 15,
      targetMuscleMass: 65
    };
    
    Utils.storage.set('currentUser', this.currentUser);
    document.getElementById('userName').textContent = this.currentUser.name;
  },
  
  /**
   * Load dashboard data
   */
  loadDashboardData: function() {
    if (this.currentPage !== 'dashboard') return;
    
    // Load mock data
    this.loadDashboardStats();
    this.loadRecentActivity();
  },
  
  /**
   * Load dashboard statistics
   */
  loadDashboardStats: function() {
    // Mock data for demonstration
    const stats = {
      currentWeight: 82.5,
      targetWeight: 80,
      bodyFat: 18.5,
      muscleMass: 62.3,
      attendanceRate: 89,
      currentStreak: 8,
      longestStreak: 15,
      disciplineScore: 85
    };
    
    document.getElementById('currentWeight').textContent = stats.currentWeight;
    document.getElementById('targetWeight').textContent = stats.targetWeight;
    document.getElementById('bodyFat').textContent = stats.bodyFat;
    document.getElementById('muscleMass').textContent = stats.muscleMass;
    document.getElementById('attendanceRate').textContent = stats.attendanceRate;
    document.getElementById('currentStreak').textContent = stats.currentStreak;
    document.getElementById('longestStreak').textContent = stats.longestStreak;
    document.getElementById('disciplineScore').textContent = stats.disciplineScore;
  },
  
  /**
   * Load recent activity
   */
  loadRecentActivity: function() {
    const activities = [
      {
        icon: '✅',
        title: 'Logged workout',
        time: '2 hours ago'
      },
      {
        icon: '⚖️',
        title: 'Recorded weight: 82.5 kg',
        time: '4 hours ago'
      },
      {
        icon: '💧',
        title: 'Completed water intake goal',
        time: '1 day ago'
      },
      {
        icon: '🏋️',
        title: 'Started new workout program',
        time: '3 days ago'
      }
    ];
    
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-content">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-time">${activity.time}</div>
        </div>
      `;
      activityList.appendChild(item);
    });
  },
  
  /**
   * Load page-specific data
   */
  loadPageData: function(page) {
    switch(page) {
      case 'dashboard':
        this.loadDashboardData();
        break;
      case 'attendance':
        this.loadAttendanceData();
        break;
      case 'workouts':
        this.loadWorkoutsData();
        break;
      // Add more cases as needed
    }
  },
  
  /**
   * Load attendance data
   */
  loadAttendanceData: function() {
    // To be implemented
    console.log('Loading attendance data');
  },
  
  /**
   * Load workouts data
   */
  loadWorkoutsData: function() {
    // To be implemented
    console.log('Loading workouts data');
  },
  
  /**
   * Handle status checkbox change
   */
  handleStatusChange: function(checkbox) {
    const statusId = checkbox.id;
    const isChecked = checkbox.checked;
    
    // Update visual feedback
    const statusItem = checkbox.closest('.status-item');
    if (isChecked) {
      statusItem.style.opacity = '1';
    } else {
      statusItem.style.opacity = '0.6';
    }
    
    // Save to local storage
    Utils.storage.set('status_' + statusId, isChecked);
    
    console.log('Status changed:', statusId, isChecked);
  },
  
  /**
   * Toggle dark/light theme
   */
  toggleTheme: function() {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark-mode');
    
    if (isDarkMode) {
      html.classList.remove('dark-mode');
      localStorage.setItem('pfos_theme', 'light');
      document.getElementById('themeToggle').querySelector('.theme-icon').textContent = '🌙';
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem('pfos_theme', 'dark');
      document.getElementById('themeToggle').querySelector('.theme-icon').textContent = '☀️';
    }
  },
  
  /**
   * Initialize theme from local storage
   */
  initTheme: function() {
    const theme = localStorage.getItem('pfos_theme') || 'light';
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark-mode');
      document.getElementById('themeToggle').querySelector('.theme-icon').textContent = '☀️';
    } else {
      html.classList.remove('dark-mode');
      document.getElementById('themeToggle').querySelector('.theme-icon').textContent = '🌙';
    }
  },
  
  /**
   * Show settings modal
   */
  showSettings: function() {
    document.getElementById('settingsModal').style.display = 'flex';
  },
  
  /**
   * Format and display data
   */
  formatStat: function(value, decimals = 1) {
    if (value === null || value === undefined) return '--';
    return Utils.round(value, decimals);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize i18n first
  i18n.init();
  
  // Initialize theme
  App.initTheme();
  
  // Initialize app
  App.init();
  
  // Load initial dashboard data
  setTimeout(() => {
    App.loadDashboardData();
  }, 500);
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar').classList.remove('active');
  }
});

// Handle page visibility for refreshing data
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    // Page is visible, refresh data
    App.loadPageData(App.currentPage);
  }
});

// Prevent accidental data loss
window.addEventListener('beforeunload', function(e) {
  // Check if there are unsaved changes
  const hasUnsavedChanges = false; // To be implemented
  
  if (hasUnsavedChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});
