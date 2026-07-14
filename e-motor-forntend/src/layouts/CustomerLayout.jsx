import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    HomeIcon,
    CalendarDaysIcon,
    ClockIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const customerNav = [
    { name: 'Dashboard', href: '/customer/dashboard', icon: HomeIcon },
    { name: 'Reservasi', href: '/customer/reservasi', icon: CalendarDaysIcon },
    { name: 'Riwayat', href: '/customer/riwayat', icon: ClockIcon },
    { name: 'Profil', href: '/customer/profil', icon: UserCircleIcon },
];

export default function CustomerLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Top Navigation */}
            <header className="bg-dark-800 border-b border-dark-700 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-bold text-white">E-TMotor Bengkel</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Keluar
                    </button>
                </div>
            </header>

            {/* Bottom Navigation (Mobile) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 flex justify-around p-2 lg:hidden z-40">
                {customerNav.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition ${
                                isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">
                <Outlet />
            </main>

            {/* Side Navigation (Desktop) */}
            <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-56 bg-dark-800 border-r border-dark-700 p-4">
                <h1 className="text-xl font-bold text-white mb-8">E-TMotor</h1>
                <nav className="space-y-1">
                    {customerNav.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                                    isActive
                                        ? 'bg-primary text-white'
                                        : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-dark-700 hover:text-red-300 rounded-lg transition mt-4"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Keluar
                    </button>
                </nav>
            </aside>
        </div>
    );
}