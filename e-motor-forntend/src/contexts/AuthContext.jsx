import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // No need to set header here, Axios interceptor does it
                    const response = await api.get('/profile');
                    setUser(response.data.data);
                } catch (error) {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        validateSession();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { data } = response.data;

            localStorage.setItem('token', data.token);
            // We store the user object for immediate UI update, but session validation will re-fetch it.
            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);
            toast.success('Login berhasil!');

            return { success: true, role: data.user.role };
        } catch (error) {
            const message = error.response?.data?.message || 'Login gagal, coba lagi.';
            toast.error(message);
            return { success: false };
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/register', userData);
            const { data } = response.data;

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);
            toast.success('Registrasi berhasil!');

            return { success: true, role: data.user.role };
        } catch (error) {
            const message = error.response?.data?.message || 'Registrasi gagal, coba lagi.';
            toast.error(message);
            return { success: false };
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch {
            // Ignore error on logout
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            toast.success('Logout berhasil');
        }
    };

    const updateProfile = async (updatedData) => {
        try {
            const response = await api.put('/profile', updatedData);
            const { data } = response.data;
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            toast.success('Profil berhasil diperbarui!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Update profil gagal, coba lagi.';
            toast.error(message);
            return { success: false };
        }
    };

    const changePassword = async (passwordData) => {
        try {
            await api.put('/change-password', passwordData);
            toast.success('Password berhasil diubah!');
            return { success: true };
        } catch (error) {
            // Handle validation errors specifically
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                // Display first error message
                const firstError = Object.values(errors)[0][0];
                toast.error(firstError);
            } else {
                const message = error.response?.data?.message || 'Gagal mengubah password, coba lagi.';
                toast.error(message);
            }
            return { success: false };
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isCustomer: user?.role === 'pelanggan',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};