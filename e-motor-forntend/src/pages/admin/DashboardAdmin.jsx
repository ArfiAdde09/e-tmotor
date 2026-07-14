import { WrenchScrewdriverIcon, BanknotesIcon, UsersIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Sparepart', value: '234', icon: WrenchScrewdriverIcon },
  { name: 'Transaksi Hari Ini', value: '12', icon: BanknotesIcon },
  { name: 'Pelanggan Aktif', value: '89', icon: UsersIcon },
  { name: 'Reservasi Pending', value: '5', icon: ClipboardDocumentListIcon },
];

export default function DashboardAdmin() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Dashboard Admin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-dark-800 border border-dark-600 rounded-xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <Icon className="h-10 w-10 text-primary/80" />
              </div>
            </div>
          );
        })}
      </div>
      {/* Grafik sederhana atau tabel ringkasan */}
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-3 text-gray-300">
          <p>• Servis motor A selesai pukul 10:30</p>
          <p>• Stok oli mesin bertambah +20</p>
          <p>• Pelanggan baru terdaftar: Budi</p>
        </div>
      </div>
    </div>
  );
}