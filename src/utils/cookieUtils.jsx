// utils/cookieUtils.js

/**
 * Set a cookie with JSON serialization support
 * @param {string} name - Cookie name
 * @param {any} value - Cookie value (will be JSON stringified)
 * @param {number} days - Expiration in days (default: 7)
 * @param {object} options - Additional cookie options
 */
export const setCookie = (name, value, days = 7, options = {}) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  const {
    path = '/',
    secure = true,
    sameSite = 'strict',
    domain = null
  } = options;
  
  let cookieString = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=${path}`;
  
  if (secure) cookieString += ';secure';
  if (sameSite) cookieString += `;samesite=${sameSite}`;
  if (domain) cookieString += `;domain=${domain}`;
  
  document.cookie = cookieString;
};

/**
 * Get a cookie value with JSON parsing support
 * @param {string} name - Cookie name
 * @returns {any} - Parsed cookie value or null if not found
 */
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
      } catch (e) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
};

/**
 * Remove a cookie
 * @param {string} name - Cookie name
 * @param {string} path - Cookie path (default: '/')
 */
export const removeCookie = (name, path = '/') => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path};`;
};

/**
 * Get all cookies as an object
 * @returns {object} - Object with all cookies
 */
export const getAllCookies = () => {
  const cookies = {};
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    
    const eqPos = c.indexOf('=');
    if (eqPos > 0) {
      const name = c.substring(0, eqPos);
      const value = c.substring(eqPos + 1);
      
      try {
        cookies[name] = JSON.parse(decodeURIComponent(value));
      } catch (e) {
        cookies[name] = decodeURIComponent(value);
      }
    }
  }
  return cookies;
};

/**
 * Clear all cookies
 */
export const clearAllCookies = () => {
  const cookies = document.cookie.split(";");
  
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

// User-specific cookie utilities
export const userCookieUtils = {
  /**
   * Store complete user data in cookies
   * @param {object} userData - User data object
   * @param {number} days - Expiration in days
   */
  setUserData: (userData, days = 30) => {
    if (userData) {
      // Store complete user object
      setCookie('user', userData, days);
      
      // Store individual fields for easy access
      setCookie('userId', userData.id, days);
      setCookie('userEmail', userData.email, days);
      setCookie('userName', userData.fullName || userData.name, days);
      setCookie('userRole', userData.roleId, days);
      setCookie('userStatus', userData.status, days);
      
      // Store any additional fields
      Object.keys(userData).forEach(key => {
        if (key !== 'password' && key !== 'confirmPassword') {
          setCookie(`user_${key}`, userData[key], days);
        }
      });
      
      setCookie('loginTime', new Date().toISOString(), days);
      setCookie('isAuthenticated', true, days);
    }
  },

  /**
   * Get complete user data from cookies
   * @returns {object|null} - User data or null
   */
  getUserData: () => {
    return getCookie('user');
  },

  /**
   * Get specific user field
   * @param {string} field - Field name
   * @returns {any} - Field value or null
   */
  getUserField: (field) => {
    return getCookie(`user_${field}`) || getCookie(field);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - Authentication status
   */
  isAuthenticated: () => {
    return getCookie('isAuthenticated') === true && getCookie('user') !== null;
  },

  /**
   * Get authentication token
   * @returns {string|null} - Auth token
   */
  getAuthToken: () => {
    return getCookie('authToken');
  },

  /**
   * Set authentication token
   * @param {string} token - Auth token
   * @param {number} days - Expiration in days
   */
  setAuthToken: (token, days = 30) => {
    setCookie('authToken', token, days);
  },

  /**
   * Clear all user data from cookies
   */
  clearUserData: () => {
    const userCookies = [
      'user', 'userId', 'userEmail', 'userName', 'userRole', 'userStatus',
      'authToken', 'isAuthenticated', 'loginTime'
    ];
    
    userCookies.forEach(cookie => removeCookie(cookie));
    
    // Clear any additional user_ prefixed cookies
    const allCookies = getAllCookies();
    Object.keys(allCookies).forEach(key => {
      if (key.startsWith('user_')) {
        removeCookie(key);
      }
    });
  },

  /**
   * Get login time
   * @returns {Date|null} - Login time or null
   */
  getLoginTime: () => {
    const loginTime = getCookie('loginTime');
    return loginTime ? new Date(loginTime) : null;
  },

  /**
   * Check if session is expired
   * @param {number} maxHours - Maximum session duration in hours (default: 24)
   * @returns {boolean} - True if expired
   */
  isSessionExpired: (maxHours = 24) => {
    const loginTime = userCookieUtils.getLoginTime();
    if (!loginTime) return true;
    
    const now = new Date();
    const timeDiff = now - loginTime;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    return hoursDiff > maxHours;
  }
};

export default {
  setCookie,
  getCookie,
  removeCookie,
  getAllCookies,
  clearAllCookies,
  userCookieUtils
};