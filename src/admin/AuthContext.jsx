// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../env';

// // Create AuthContext
// const AuthContext = createContext();

// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Configure axios to include credentials with every request
//   useEffect(() => {
//     axios.defaults.withCredentials = true;

//     // Add request interceptor for debugging
//     axios.interceptors.request.use(
//       (config) => {
//         console.log('Making request to:', config.url);
//         console.log('With credentials:', config.withCredentials);
//         return config;
//       },
//       (error) => {
//         console.error('Request interceptor error:', error);
//         return Promise.reject(error);
//       }
//     );

//     // Add response interceptor for handling 401s
//     axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;

//           // Try to refresh token
//           try {
//             await refreshToken();
//             // Retry the original request
//             return axios(originalRequest);
//           } catch (refreshError) {
//             console.error('Token refresh failed:', refreshError);
//             clearAuth();
//             return Promise.reject(error);
//           }
//         }

//         return Promise.reject(error);
//       }
//     );
//   }, []);

//   // Function to get user info from cookies
//   const getUserFromCookies = () => {
//     try {
//       const cookies = document.cookie.split(';');
//       console.log('All cookies:', document.cookie);

//       const userInfoCookie = cookies.find(cookie => 
//         cookie.trim().startsWith('userInfo=')
//       );

//       if (userInfoCookie) {
//         const userInfoValue = userInfoCookie.split('=')[1];
//         const decodedUserInfo = decodeURIComponent(userInfoValue);
//         console.log('User info from cookie:', decodedUserInfo);
//         return JSON.parse(decodedUserInfo);
//       }

//       console.log('No userInfo cookie found');
//       return null;
//     } catch (error) {
//       console.error('Error parsing user info from cookies:', error);
//       return null;
//     }
//   };

//   // Function to check if auth token exists in cookies
//   const hasAuthToken = () => {
//     const cookies = document.cookie.split(';');
//     const hasToken = cookies.some(cookie => cookie.trim().startsWith('authToken='));
//     console.log('Auth token present:', hasToken);
//     return hasToken;
//   };

//   // Initialize authentication state
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         console.log('Initializing auth...');

//         // Check if we have cookies
//         const userFromCookies = getUserFromCookies();
//         const hasToken = hasAuthToken();

//         if (userFromCookies && hasToken) {
//           console.log('Found user info and token in cookies, verifying with backend...');

//           // Verify token with backend
//           const response = await axios.get(`${BASE_URL}/api/current-user`);

//           if (response.data.success) {
//             console.log('Token verification successful');
//             setUser(response.data.user);
//             setIsAuthenticated(true);
//           } else {
//             console.log('Token verification failed');
//             clearAuth();
//           }
//         } else {
//           console.log('No valid cookies found');
//           clearAuth();
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         console.error('Error response:', error.response?.data);
//         clearAuth();
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Login function
//   const login = async (email, password, rememberMe = false) => {
//     try {
//       console.log('Attempting login for:', email);

//       const response = await axios.post(`${BASE_URL}/api/login`, {
//         email,
//         password,
//         rememberMe,
//       });

//       console.log('Login response:', response.data);

//       if (response.data.success) {
//         setUser(response.data.user);
//         setIsAuthenticated(true);

//         // Store user info in localStorage as backup
//         localStorage.setItem('userInfo', JSON.stringify(response.data.user));

//         console.log('Login successful');
//         return { success: true, user: response.data.user };
//       } else {
//         console.log('Login failed:', response.data.message);
//         return { success: false, message: response.data.message };
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       console.error('Login error response:', error.response?.data);

//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       console.log('Attempting logout...');
//       await axios.post(`${BASE_URL}/api/logout`);
//       console.log('Logout successful');
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       clearAuth();
//     }
//   };

//   // Clear authentication state
//   const clearAuth = () => {
//     console.log('Clearing auth state...');
//     setUser(null);
//     setIsAuthenticated(false);

//     // Clear localStorage
//     localStorage.removeItem('userInfo');

//     // Clear cookies (note: this only works for cookies set with httpOnly: false)
//     document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

//     // For httpOnly cookies, we rely on the backend logout endpoint
//   };

//   // Refresh token function
//   const refreshToken = async () => {
//     try {
//       console.log('Attempting to refresh token...');
//       const response = await axios.post(`${BASE_URL}/api/refresh-token`);

//       if (response.data.success) {
//         console.log('Token refresh successful');
//         // Token refreshed successfully, update user info if needed
//         const currentUserResponse = await axios.get(`${BASE_URL}/api/current-user`);
//         if (currentUserResponse.data.success) {
//           setUser(currentUserResponse.data.user);
//           setIsAuthenticated(true);
//           localStorage.setItem('userInfo', JSON.stringify(currentUserResponse.data.user));
//         }
//         return true;
//       }
//       console.log('Token refresh failed');
//       return false;
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       clearAuth();
//       return false;
//     }
//   };

//   // Update user info
//   const updateUser = (updatedUser) => {
//     setUser(updatedUser);
//     localStorage.setItem('userInfo', JSON.stringify(updatedUser));
//   };

//   // Get current user from backend
//   const getCurrentUser = async () => {
//     try {
//       console.log('Getting current user from backend...');
//       const response = await axios.get(`${BASE_URL}/api/current-user`);

//       if (response.data.success) {
//         console.log('Got current user successfully');
//         setUser(response.data.user);
//         setIsAuthenticated(true);
//         localStorage.setItem('userInfo', JSON.stringify(response.data.user));
//         return response.data.user;
//       } else {
//         console.log('Get current user failed');
//         clearAuth();
//         return null;
//       }
//     } catch (error) {
//       console.error('Get current user error:', error);
//       clearAuth();
//       return null;
//     }
//   };

//   // Context value
//   const value = {
//     user,
//     loading,
//     isAuthenticated,
//     login,
//     logout,
//     refreshToken,
//     updateUser,
//     getCurrentUser,
//     clearAuth,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../env';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// Set axios defaults globally
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isRefreshing = useRef(false);
  const failedQueue = useRef([]);

  const processQueue = (error, token = null) => {
    failedQueue.current.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue.current = [];
  };

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      async (error) => {
        const originalRequest = error.config;

        // Don't retry for login, logout, or refresh-token endpoints
        if (originalRequest.url?.includes('/login') ||
          originalRequest.url?.includes('/logout') ||
          originalRequest.url?.includes('/refresh-token')) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing.current) {
            return new Promise((resolve, reject) => {
              failedQueue.current.push({ resolve, reject });
            }).then(() => {
              return axios(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing.current = true;

          try {
            const refreshed = await refreshToken();
            if (refreshed) {
              processQueue(null);
              return axios(originalRequest);
            } else {
              processQueue(new Error('Token refresh failed'));
              clearAuth();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            processQueue(refreshError);
            clearAuth();
            return Promise.reject(error);
          } finally {
            isRefreshing.current = false;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Initialize authentication on app start or refresh
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First, check if we might be authenticated (from localStorage or userInfo cookie)
        const storedUser = localStorage.getItem('userInfo');
        const hasUserInfoCookie = document.cookie.includes('userInfo');

        if (!storedUser && !hasUserInfoCookie) {
          setLoading(false);
          return;
        }

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (parseError) {
            localStorage.removeItem('userInfo');
          }
        }

        // Verify with backend
        const res = await axios.get(`${BASE_URL}/api/current-user`);
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
          localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        } else {
          clearAuth();
        }
      } catch (err) {
        // Only clear if it's an actual 401, not a network error
        if (err.response?.status === 401) {
          clearAuth();
        }
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, { email, password, rememberMe });
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        return { success: true, user: res.data.user };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/logout`);
    } catch { }
    clearAuth();
  };

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userInfo');
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/refresh-token`);
      if (res.data.success) {
        const userRes = await axios.get(`${BASE_URL}/api/current-user`);
        if (userRes.data.success && userRes.data.user) {
          setUser(userRes.data.user);
          setIsAuthenticated(true);
          localStorage.setItem('userInfo', JSON.stringify(userRes.data.user));
          return true;
        }
      }
      return false;
    } catch (error) {
      // console.log('Token refresh failed:', error.message);
      return false;
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/current-user`);
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        return res.data.user;
      }
      clearAuth();
    } catch {
      clearAuth();
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{
      user, loading, isAuthenticated,
      login, logout, refreshToken, updateUser,
      getCurrentUser, clearAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
