import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { data } = response.data;

            localStorage.setItem('token', data.token);
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

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isCustomer: user?.role === 'pelanggan' || user?.role === 'customer',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};