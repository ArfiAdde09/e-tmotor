import { Link } from 'react-router-dom';
import { CalendarDaysIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <header className="border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">E-TMotor</span>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white transition">Masuk</Link>
            <Link to="/register" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition">Daftar</Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Servis Motor <span className="text-primary">Mudah & Cepat</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Reservasi servis online, pantau riwayat, dan kelola sparepart dalam satu platform. Bengkel modern untuk motor kesayangan Anda.
        </p>
        <Link to="/register" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl text-lg transition transform hover:scale-105 inline-block">
          Mulai Sekarang
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: CalendarDaysIcon, title: 'Reservasi Online', desc: 'Booking servis kapan saja tanpa antri.' },
          { icon: ClockIcon, title: 'Riwayat Servis', desc: 'Lacak semua perbaikan motor Anda.' },
          { icon: CurrencyDollarIcon, title: 'Transaksi Transparan', desc: 'Lihat rincian biaya dengan jelas.' },
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="bg-dark-800 rounded-xl p-6 border border-dark-600 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <Icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          );
        })}
      </section>

      <footer className="border-t border-dark-600 py-8 text-center text-gray-500">
        © 2024 E-TMotor. All rights reserved.
      </footer>
    </div>
  );
}