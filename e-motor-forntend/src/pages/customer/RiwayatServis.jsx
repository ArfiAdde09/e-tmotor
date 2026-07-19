import { useState, useEffect } from 'react';
import api from '../../services/api';
import Table from '../../components/Table';
import toast from 'react-hot-toast';

export default function RiwayatServis() {
  const [reservations, setReservations] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch reservations, can be called with a specific URL for pagination
  const fetchReservations = async (url = '/reservasi') => {
    setLoading(true);
    try {
      // Laravel's paginator returns full URLs, which axios handles correctly.
      // We extract just the path and query for the api call.
      const path = url.startsWith('http') ? `/` + url.split('/').slice(3).join('/') : url;
      const response = await api.get(path);

      setReservations(response.data.data);
      setPagination(response.data.meta);
    } catch (error) {
      toast.error('Gagal memuat riwayat reservasi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai': return 'bg-green-900 text-green-300';
      case 'Disetujui': return 'bg-blue-900 text-blue-300';
      case 'Ditolak': return 'bg-red-900 text-red-300';
      case 'Menunggu':
      default:
        return 'bg-yellow-900 text-yellow-300';
    }
  };

  const headers = ['Motor', 'Layanan', 'Tanggal & Jam', 'Status', 'No. Antrian'];
  const renderRow = (item) => (
    <tr key={item.id} className="hover:bg-dark-800/50">
      <td className="px-6 py-4 text-white whitespace-nowrap">
        {item.motor ? `${item.motor.merk} ${item.motor.model}` : 'N/A'}
        <span className="block text-xs text-gray-400">{item.motor?.plat_nomor}</span>
      </td>
      <td className="px-6 py-4 text-white whitespace-nowrap">{item.layanan?.nama || 'N/A'}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
        <span className="block text-xs text-gray-400">{item.jam}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 font-mono whitespace-nowrap">{item.nomor_antrian}</td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Riwayat Servis</h2>
      {loading ? (
        <div className="text-center text-gray-400 p-10 bg-dark-800 rounded-xl border border-dark-600">Memuat riwayat...</div>
      ) : (
        <>
          <Table 
            headers={headers} 
            data={reservations} 
            renderRow={renderRow} 
            emptyMessage="Anda belum memiliki riwayat servis."
          />
          {pagination && reservations.length > 0 && pagination.last_page > 1 && (
            <div className="flex justify-between items-center text-sm text-gray-400">
                <div>
                    Halaman {pagination.current_page} dari {pagination.last_page} (Total: {pagination.total} reservasi)
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => fetchReservations(pagination.prev_page_url)} 
                        disabled={!pagination.prev_page_url}
                        className="px-3 py-1 rounded-md bg-dark-700 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sebelumnya
                    </button>
                    <button 
                        onClick={() => fetchReservations(pagination.next_page_url)} 
                        disabled={!pagination.next_page_url}
                        className="px-3 py-1 rounded-md bg-dark-700 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}