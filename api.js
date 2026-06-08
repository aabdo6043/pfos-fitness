/**
 * API Module
 * Handles all communication with Google Apps Script backend
 */

const API = {
  // Backend URL - will be set when deployed as Google Apps Script Web App
  baseUrl: 'https://script.google.com/macros/s/AKfycbxnOD-T4yBlQgGjZin55sL5IM9VExQSqiI1QaNiaGku-bysAakkjNL_6JD34xAbzCYebw/exec',
  
  /**
   * Initialize API with base URL
   */
  init: function(url) {
    this.baseUrl = url;
  },
  
  /**
   * Make API request
   */
  request: function(action, data = {}) {
    return new Promise((resolve, reject) => {
      const payload = new FormData();
      payload.append('action', action);
      payload.append('data', JSON.stringify(data));
      
fetch(this.baseUrl, {
  method: 'POST',
  body: payload // تغيير payload إلى body
})
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          resolve(result);
        } else {
          reject(result.error || 'Unknown error');
        }
      })
      .catch(error => {
        reject(error.message || 'Network error');
      });
    });
  },
  
  // User API
  user: {
    create: (data) => API.request('createUser', data),
    get: (userId) => API.request('getUser', { userId }),
    update: (data) => API.request('updateUser', data),
  },
  
  // Attendance API
  attendance: {
    log: (data) => API.request('logAttendance', data),
    getHistory: (userId, month, year) => API.request('getAttendanceHistory', { userId, month, year }),
    getStats: (userId) => API.request('getAttendanceStats', { userId }),
  },
  
  // Workout API
  workout: {
    create: (data) => API.request('createWorkout', data),
    getAll: (userId) => API.request('getWorkouts', { userId }),
    log: (data) => API.request('logWorkout', data),
    getLogs: (userId, date) => API.request('getWorkoutLogs', { userId, date }),
  },
  
  // Measurement API
  measurement: {
    record: (data) => API.request('recordMeasurement', data),
    getAll: (userId) => API.request('getMeasurements', { userId }),
  },
  
  // Weight API
  weight: {
    record: (data) => API.request('recordWeight', data),
    getHistory: (userId) => API.request('getWeightHistory', { userId }),
    getStats: (userId) => API.request('getWeightStats', { userId }),
  },
  
  // InBody API
  inbody: {
    upload: (data) => API.request('uploadInBodyImage', data),
    getAll: (userId) => API.request('getInBodyReports', { userId }),
    update: (data) => API.request('updateInBodyData', data),
  },
  
  // Nutrition API
  nutrition: {
    record: (data) => API.request('recordNutrition', data),
    get: (userId, date) => API.request('getNutrition', { userId, date }),
  },
  
  // Water API
  water: {
    record: (data) => API.request('recordWater', data),
    getHistory: (userId) => API.request('getWaterHistory', { userId }),
  },
  
  // Sleep API
  sleep: {
    record: (data) => API.request('recordSleep', data),
    getHistory: (userId) => API.request('getSleepHistory', { userId }),
  },
  
  // Habit API
  habit: {
    create: (data) => API.request('createHabit', data),
    getAll: (userId) => API.request('getHabits', { userId }),
    log: (data) => API.request('logHabit', data),
  },
  
  // Goal API
  goal: {
    create: (data) => API.request('createGoal', data),
    getAll: (userId) => API.request('getGoals', { userId }),
    updateProgress: (data) => API.request('updateGoalProgress', data),
  },
  
  // Photo API
  photo: {
    upload: (data) => API.request('uploadProgressPhoto', data),
    getAll: (userId) => API.request('getProgressPhotos', { userId }),
  },
  
  // Report API
  report: {
    daily: (userId, date) => API.request('getDailyReport', { userId, date }),
    weekly: (userId, weekStart) => API.request('getWeeklyReport', { userId, weekStart }),
    monthly: (userId, month, year) => API.request('getMonthlyReport', { userId, month, year }),
  }
};

// Mock API for development (will be replaced with real API calls)
const MockAPI = {
  userId: 'user_' + Math.random().toString(36).substr(2, 9),
  
  mockRequest: function(action, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock API call:', action, data);
        
        // Return mock data based on action
        let response = {
          success: true,
          data: {}
        };
        
        switch(action) {
          case 'getAttendanceStats':
            response.data = {
              totalDays: 45,
              presentDays: 40,
              absentDays: 3,
              restDays: 2,
              currentStreak: 8,
              longestStreak: 15,
              monthlyAttendanceRate: 89,
              totalDisciplineScore: 350
            };
            break;
            
          case 'getWeightStats':
            response.data = {
              currentWeight: 82.5,
              startWeight: 85,
              maxWeight: 86,
              minWeight: 81,
              averageWeight: 83.2,
              totalChange: -2.5,
              totalChangePercentage: -2.94
            };
            break;
            
          case 'getDailyReport':
            response.data = {
              date: new Date().toISOString().split('T')[0],
              attendance: { Status: 'Present' },
              workouts: [],
              nutrition: { Calories: 2100, Protein: 150 },
              water: { LitersConsumed: 2.5 },
              sleep: { SleepDuration: 7.5 },
              habits: []
            };
            break;
            
          default:
            response.data = { message: 'Mock response for ' + action };
        }
        
        resolve(response);
      }, 500);
    });
  }
};

// Use mock API in development
const APIClient = {
  request: function(action, data) {
    // In development, use mock API
    if (!API.baseUrl) {
      return MockAPI.mockRequest(action, data);
    }
    return API.request(action, data);
  }
};
