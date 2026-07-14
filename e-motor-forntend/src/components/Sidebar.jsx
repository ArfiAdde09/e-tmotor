import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ChartBarIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  ChartBarIcon: ChartBarIcon,
  WrenchScrewdriverIcon: WrenchScrewdriverIcon,
  BanknotesIcon: BanknotesIcon,
  UserCircleIcon: UserCircleIcon,
};

export default function Sidebar({ navigation, role, onClose }) {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  return (
    <div className="flex h-full flex-col bg-dark-800 border-r border-dark-600">
      <div className="flex items-center justify-between px-6 py-5 border-b border-dark-600">
        <Link to={`/${role}/dashboard`} className="flex items-center space-x-2">
          <span className="text-primary text-2xl font-bold">E-TM</span>
          <span className="text-white font-semibold">Admin</span>
        </Link>
        <button className="lg:hidden text-gray-400 hover:text-white" onClick={onClose}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-gray-400 hover:bg-dark-700 hover:text-white border-l-4 border-transparent'
              }`}
            >
              {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0" />}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-dark-600">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-gray-400 rounded-lg hover:bg-dark-700 hover:text-red-400 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}