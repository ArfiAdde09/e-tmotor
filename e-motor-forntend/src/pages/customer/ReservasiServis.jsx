import { useState } from 'react';
import toast from 'react-hot-toast';

const jenisServis = ['Ganti Oli', 'Servis Ringan', 'Servis Berat', 'Ganti Ban', 'Cek Kelistrikan'];

export default function ReservasiServis() {
  const [form, setForm] = useState({ jenis: '', tanggal: '', keluhan: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Reservasi berhasil dibuat!');
    setForm({ jenis: '', tanggal: '', keluhan: '' });
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Reservasi Servis</h2>
      <form onSubmit={handleSubmit} className="bg-dark-800 border border-dark-600 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Jenis Servis</label>
          <select value={form.jenis} onChange={(e) => setForm({...form, jenis: e.target.value})} required
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none">
            <option value="">Pilih jenis servis</option>
            {jenisServis.map((j) => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tanggal</label>
          <input type="date" value={form.tanggal} onChange={(e) => setForm({...form, tanggal: e.target.value})} required
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Keluhan</label>
          <textarea value={form.keluhan} onChange={(e) => setForm({...form, keluhan: e.target.value})} rows="3"
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition">
          Buat Reservasi
        </button>
      </form>
    </div>
  );
}