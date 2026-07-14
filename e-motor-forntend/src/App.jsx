import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

// Admin Pages
import DashboardAdmin from './pages/admin/DashboardAdmin';
import ManajemenSparepart from './pages/admin/ManajemenSparepart';
import Transaksi from './pages/admin/Transaksi';

// Customer Pages
import DashboardCustomer from './pages/customer/DashboardCustomer';
import ReservasiServis from './pages/customer/ReservasiServis';
import RiwayatServis from './pages/customer/RiwayatServis';

// Shared
import Profil from './pages/Profil';

function PrivateRoute({ children, role, redirectTo = '/login' }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    if (role && user.role !== role) {
        // Redirect to appropriate dashboard based on role
        const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard';
        return <Navigate to={dashboardPath} replace />;
    }

    return children;
}

export default function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute role="admin">
                        <AdminLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="sparepart" element={<ManajemenSparepart />} />
                <Route path="transaksi" element={<Transaksi />} />
                <Route path="profil" element={<Profil />} />
            </Route>

            {/* Customer Routes */}
            <Route
                path="/customer"
                element={
                    <PrivateRoute role="pelanggan">
                        <CustomerLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Navigate to="/customer/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardCustomer />} />
                <Route path="reservasi" element={<ReservasiServis />} />
                <Route path="riwayat" element={<RiwayatServis />} />
                <Route path="profil" element={<Profil />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}