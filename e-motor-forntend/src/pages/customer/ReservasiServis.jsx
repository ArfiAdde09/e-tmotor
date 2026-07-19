import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ReservasiServis() {
  const navigate = useNavigate();
  const [motors, setMotors] = useState([]);
  const [layanans, setLayanans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    motor_id: '',
    layanan_id: '',
    tanggal: '',
    jam: '',
    keluhan: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [motorsRes, layanansRes] = await Promise.all([
          api.get('/motor?per_page=100'), // Fetch user's motors
          api.get('/layanan'),          // Fetch all available services
        ]);

        setMotors(motorsRes.data.data);
        setLayanans(layanansRes.data.data);

        // Pre-select the first motor if available
        if (motorsRes.data.data.length > 0) {
            setFormData(prev => ({ ...prev, motor_id: motorsRes.data.data[0].id }));
        }

      } catch (err) {
        setError('Gagal memuat data motor atau layanan.');
        toast.error('Gagal memuat data yang diperlukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.motor_id || !formData.layanan_id || !formData.tanggal || !formData.jam) {
        toast.error('Harap lengkapi semua field yang wajib diisi.');
        return;
    }

    const toastId = toast.loading('Membuat reservasi...');
    try {
      await api.post('/reservasi', formData);
      toast.success('Reservasi berhasil dibuat!', { id: toastId });
      navigate('/customer/riwayat-servis'); // Redirect to reservation history page
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal membuat reservasi.';
      toast.error(message, { id: toastId });
    }
  };

  if (loading) return <div className="text-white text-center p-8">Memuat data formulir...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
   if (!loading && motors.length === 0) {
    return (
      <div className="text-center p-8 text-white">
        <h3 className="text-lg font-semibold">Anda belum memiliki motor terdaftar.</h3>
        <p className="text-gray-400">Silakan tambahkan data motor di halaman profil terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Reservasi Servis</h2>
      <form onSubmit={handleSubmit} className="bg-dark-800 border border-dark-600 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Pilih Motor</label>
          <select name="motor_id" value={formData.motor_id} onChange={handleChange} required
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none">
            {motors.map((motor) => (
              <option key={motor.id} value={motor.id}>
                {motor.merk} {motor.model} ({motor.plat_nomor})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Jenis Servis</label>
          <select name="layanan_id" value={formData.layanan_id} onChange={handleChange} required
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none">
            <option value="">Pilih jenis servis</option>
            {layanans.map((layanan) => (
              <option key={layanan.id} value={layanan.id}>
                {layanan.nama} (Rp {Number(layanan.harga).toLocaleString('id-ID')})
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tanggal</label>
            <input name="tanggal" type="date" value={formData.tanggal} onChange={handleChange} required
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Jam</label>
            <input name="jam" type="time" value={formData.jam} onChange={handleChange} required
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Keluhan (Opsional)</label>
          <textarea name="keluhan" value={formData.keluhan} onChange={handleChange} rows="3"
            placeholder="Jelaskan keluhan Anda terkait motor..."
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition">
          Buat Reservasi
        </button>
      </form>
    </div>
  );
}