/**
 * Internationalization (i18n) Module
 * Handles Arabic and English language support
 */

const i18n = {
  currentLanguage: localStorage.getItem('pfos_language') || 'en',
  
  translations: {
    en: {
      // Navigation
      nav_dashboard: 'Dashboard',
      nav_attendance: 'Attendance',
      nav_workouts: 'Workouts',
      nav_measurements: 'Measurements',
      nav_weight: 'Weight',
      nav_nutrition: 'Nutrition',
      nav_water: 'Water',
      nav_sleep: 'Sleep',
      nav_habits: 'Habits',
      nav_inbody: 'InBody',
      nav_goals: 'Goals',
      nav_photos: 'Progress Photos',
      nav_reports: 'Reports',
      
      // Status
      status_online: 'Online',
      status_gym: 'Gym',
      status_workout: 'Workout',
      status_cardio: 'Cardio',
      status_water: 'Water',
      status_calories: 'Calories',
      status_protein: 'Protein',
      status_sleep: 'Sleep',
      
      // Dashboard
      dashboard_title: 'Dashboard',
      dashboard_subtitle: 'Welcome to your fitness journey',
      today_status: "Today's Status",
      quick_stats: 'Quick Stats',
      attendance_stats: 'Attendance',
      monthly_progress: 'Monthly Progress',
      recent_activity: 'Recent Activity',
      
      // Stats Labels
      current_weight: 'Current Weight',
      target_weight: 'Target Weight',
      body_fat: 'Body Fat %',
      muscle_mass: 'Muscle Mass',
      attendance_rate: 'Attendance Rate',
      current_streak: 'Current Streak',
      longest_streak: 'Longest Streak',
      discipline_score: 'Discipline Score',
      days: 'days',
      
      // Settings
      settings: 'Settings',
      settings_coming_soon: 'Settings panel coming soon',
      
      // General
      page_under_development: 'This page is under development',
      no_activity: 'No recent activity',
      
      // Buttons
      btn_save: 'Save',
      btn_cancel: 'Cancel',
      btn_delete: 'Delete',
      btn_edit: 'Edit',
      btn_add: 'Add',
      btn_submit: 'Submit',
      btn_close: 'Close',
      
      // Messages
      success_saved: 'Saved successfully',
      error_save_failed: 'Failed to save',
      error_load_failed: 'Failed to load data',
      
      // Forms
      label_name: 'Name',
      label_email: 'Email',
      label_date: 'Date',
      label_notes: 'Notes',
      placeholder_enter_value: 'Enter value...',
      
      // Time
      today: 'Today',
      yesterday: 'Yesterday',
      this_week: 'This Week',
      this_month: 'This Month',
      this_year: 'This Year',
      
      // Units
      unit_kg: 'kg',
      unit_lbs: 'lbs',
      unit_cm: 'cm',
      unit_in: 'in',
      unit_hours: 'hours',
      unit_minutes: 'minutes',
      unit_liters: 'liters',
      unit_calories: 'kcal',
      unit_grams: 'g',
      unit_percent: '%'
    },
    
    ar: {
      // Navigation
      nav_dashboard: 'لوحة التحكم',
      nav_attendance: 'الحضور',
      nav_workouts: 'التمارين',
      nav_measurements: 'القياسات',
      nav_weight: 'الوزن',
      nav_nutrition: 'التغذية',
      nav_water: 'المياه',
      nav_sleep: 'النوم',
      nav_habits: 'العادات',
      nav_inbody: 'InBody',
      nav_goals: 'الأهداف',
      nav_photos: 'صور التقدم',
      nav_reports: 'التقارير',
      
      // Status
      status_online: 'متصل',
      status_gym: 'الجيم',
      status_workout: 'التمرين',
      status_cardio: 'الكارديو',
      status_water: 'المياه',
      status_calories: 'السعرات',
      status_protein: 'البروتين',
      status_sleep: 'النوم',
      
      // Dashboard
      dashboard_title: 'لوحة التحكم',
      dashboard_subtitle: 'مرحبا برحلتك اللياقية',
      today_status: 'حالة اليوم',
      quick_stats: 'إحصائيات سريعة',
      attendance_stats: 'الحضور',
      monthly_progress: 'التقدم الشهري',
      recent_activity: 'النشاط الأخير',
      
      // Stats Labels
      current_weight: 'الوزن الحالي',
      target_weight: 'الوزن المستهدف',
      body_fat: 'نسبة الدهون %',
      muscle_mass: 'كتلة العضلات',
      attendance_rate: 'معدل الحضور',
      current_streak: 'السلسلة الحالية',
      longest_streak: 'أطول سلسلة',
      discipline_score: 'درجة الانضباط',
      days: 'أيام',
      
      // Settings
      settings: 'الإعدادات',
      settings_coming_soon: 'لوحة الإعدادات قريبا',
      
      // General
      page_under_development: 'هذه الصفحة قيد التطوير',
      no_activity: 'لا توجد أنشطة حديثة',
      
      // Buttons
      btn_save: 'حفظ',
      btn_cancel: 'إلغاء',
      btn_delete: 'حذف',
      btn_edit: 'تعديل',
      btn_add: 'إضافة',
      btn_submit: 'إرسال',
      btn_close: 'إغلاق',
      
      // Messages
      success_saved: 'تم الحفظ بنجاح',
      error_save_failed: 'فشل الحفظ',
      error_load_failed: 'فشل تحميل البيانات',
      
      // Forms
      label_name: 'الاسم',
      label_email: 'البريد الإلكتروني',
      label_date: 'التاريخ',
      label_notes: 'ملاحظات',
      placeholder_enter_value: 'أدخل القيمة...',
      
      // Time
      today: 'اليوم',
      yesterday: 'أمس',
      this_week: 'هذا الأسبوع',
      this_month: 'هذا الشهر',
      this_year: 'هذا العام',
      
      // Units
      unit_kg: 'كجم',
      unit_lbs: 'رطل',
      unit_cm: 'سم',
      unit_in: 'بوصة',
      unit_hours: 'ساعات',
      unit_minutes: 'دقائق',
      unit_liters: 'لتر',
      unit_calories: 'سعرة',
      unit_grams: 'جرام',
      unit_percent: '%'
    }
  },
  
  /**
   * Get translation string
   */
  t: function(key) {
    const lang = this.currentLanguage;
    return this.translations[lang]?.[key] || this.translations['en']?.[key] || key;
  },
  
  /**
   * Set language
   */
  setLanguage: function(lang) {
    if (lang === 'ar' || lang === 'en') {
      this.currentLanguage = lang;
      localStorage.setItem('pfos_language', lang);
      this.updatePageLanguage();
    }
  },
  
  /**
   * Get current language
   */
  getLanguage: function() {
    return this.currentLanguage;
  },
  
  /**
   * Toggle language between English and Arabic
   */
  toggleLanguage: function() {
    const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  },
  
  /**
   * Update all page text based on current language
   */
  updatePageLanguage: function() {
    const html = document.documentElement;
    const dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    html.setAttribute('dir', dir);
    html.setAttribute('lang', this.currentLanguage);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
      langToggle.querySelector('.lang-text').textContent = this.currentLanguage.toUpperCase();
    }
  },
  
  /**
   * Initialize i18n
   */
  init: function() {
    this.updatePageLanguage();
  }
};

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  i18n.init();
});
