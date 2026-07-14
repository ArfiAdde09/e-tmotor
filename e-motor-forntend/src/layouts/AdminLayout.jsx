import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
    ChartBarIcon,
    WrenchScrewdriverIcon,
    BanknotesIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const adminNav = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
    { name: 'Sparepart', href: '/admin/sparepart', icon: WrenchScrewdriverIcon },
    { name: 'Transaksi', href: '/admin/transaksi', icon: BanknotesIcon },
    { name: 'Profil', href: '/admin/profil', icon: UserCircleIcon },
];

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-dark-800 border-r border-dark-700 transform transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                <div className="flex items-center justify-between p-4 border-b border-dark-700">
                    <h1 className="text-xl font-bold text-white">E-TMotor Admin</h1>
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {adminNav.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-dark-700 hover:text-white rounded-lg transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-dark-700 hover:text-red-300 rounded-lg transition mt-4"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Keluar
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                <header className="bg-dark-800 border-b border-dark-700 p-4 flex items-center">
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <div className="ml-4 lg:ml-0">
                        <h2 className="text-white font-semibold">Dashboard Admin</h2>
                    </div>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}