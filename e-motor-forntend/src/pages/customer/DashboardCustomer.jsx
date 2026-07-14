import { CalendarDaysIcon, ClockIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function DashboardCustomer() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Dashboard Pelanggan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/customer/reservasi" className="bg-dark-800 border border-dark-600 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group">
          <CalendarDaysIcon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-white">Buat Reservasi</h3>
          <p className="text-gray-400 text-sm mt-1">Booking servis motor Anda</p>
        </Link>
        <Link to="/customer/riwayat" className="bg-dark-800 border border-dark-600 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group">
          <ClockIcon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-white">Riwayat Servis</h3>
          <p className="text-gray-400 text-sm mt-1">Lihat riwayat perbaikan</p>
        </Link>
        <Link to="/customer/profil" className="bg-dark-800 border border-dark-600 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group">
          <WrenchScrewdriverIcon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-white">Profil Saya</h3>
          <p className="text-gray-400 text-sm mt-1">Kelola akun Anda</p>
        </Link>
      </div>
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Notifikasi</h3>
        <p className="text-gray-400">Anda belum memiliki notifikasi.</p>
      </div>
    </div>
  );
}