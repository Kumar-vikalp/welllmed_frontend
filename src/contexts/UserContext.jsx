import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          const response = await api.get('/me/');
          setUser(response.data);
          // Fetch profile data
          try {
            const profileResponse = await api.get('/profile/');
            setProfile(profileResponse.data);
          } catch (profileError) {
            console.log('Profile not found or incomplete');
          }
        } catch (error) {
          console.error('Failed to fetch user on initial load', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile/');
      setProfile(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile', error);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/profile/update/', profileData);
      setProfile(response.data.profile);
      return response.data;
    } catch (error) {
      console.error('Failed to update profile', error);
      throw error;
    }
  };

  const checkProfileStatus = async () => {
    try {
      const response = await api.get('/profile/status/');
      return response.data;
    } catch (error) {
      console.error('Failed to check profile status', error);
      throw error;
    }
  };

  const getActiveTime = async () => {
    try {
      const response = await api.get('/profile/active-time/');
      return response.data;
    } catch (error) {
      console.error('Failed to get active time', error);
      throw error;
    }
  };

  const signup = async (email, password) => {
    await api.post('/signup/', { email, password });
    await login(email, password);
  };

  const login = async (email, password) => {
    const response = await api.post('/login/', { email, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    const userResponse = await api.get('/me/');
    setUser(userResponse.data);
    // Try to fetch profile
    try {
      const profileResponse = await api.get('/profile/');
      setProfile(profileResponse.data);
    } catch (profileError) {
      console.log('Profile not found');
    }
    localStorage.setItem('user', JSON.stringify(userResponse.data));
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        try {
            await api.post('/logout/', { refresh: refreshToken });
        } catch (error) {
            console.error("Logout failed, proceeding to clear local data.", error);
        }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setProfile(null);
    window.location.href = '/login';
  };
  
  const forgotPassword = async (email) => {
    const response = await api.post('/forgot-password/', { email });
    return response.data;
  };

  const resetPassword = async (email, otp, new_password) => {
    const response = await api.post('/reset-password/', { email, otp, new_password });
    return response.data;
  };

  const value = { 
    user, 
    profile, 
    loading, 
    signup, 
    login, 
    logout, 
    fetchProfile,
    updateProfile,
    checkProfileStatus,
    getActiveTime,
    forgotPassword, 
    resetPassword 
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
