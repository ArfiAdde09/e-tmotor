import { useState, useEffect } from 'react';

export default function MotorForm({ onSubmit, onCancel, initialData = null, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    merk: '',
    model: '',
    tahun: new Date().getFullYear(),
    warna: '',
    plat_nomor: '',
    nomor_rangka: '',
    nomor_mesin: '',
    spesifikasi_mesin: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        merk: initialData.merk || '',
        model: initialData.model || '',
        tahun: initialData.tahun || new Date().getFullYear(),
        warna: initialData.warna || '',
        plat_nomor: initialData.plat_nomor || '',
        nomor_rangka: initialData.nomor_rangka || '',
        nomor_mesin: initialData.nomor_mesin || '',
        spesifikasi_mesin: initialData.spesifikasi_mesin || '',
      });
    } else {
      // Reset form when in 'Add' mode
      setFormData({
        merk: '', model: '', tahun: new Date().getFullYear(), warna: '', plat_nomor: '',
        nomor_rangka: '', nomor_mesin: '', spesifikasi_mesin: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField name="merk" label="Merk" value={formData.merk} onChange={handleChange} placeholder="Contoh: Honda" required />
        <InputField name="model" label="Model/Tipe" value={formData.model} onChange={handleChange} placeholder="Contoh: Vario 150" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField name="tahun" label="Tahun" type="number" value={formData.tahun} onChange={handleChange} placeholder="Contoh: 2021" required />
        <InputField name="warna" label="Warna" value={formData.warna} onChange={handleChange} placeholder="Contoh: Hitam" required />
      </div>
      <InputField name="plat_nomor" label="Plat Nomor" value={formData.plat_nomor} onChange={handleChange} placeholder="Contoh: B 1234 ABC" required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField name="nomor_rangka" label="Nomor Rangka" value={formData.nomor_rangka} onChange={handleChange} required />
        <InputField name="nomor_mesin" label="Nomor Mesin" value={formData.nomor_mesin} onChange={handleChange} required />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Spesifikasi Mesin (Opsional)</label>
        <textarea name="spesifikasi_mesin" value={formData.spesifikasi_mesin} onChange={handleChange} rows="2"
          placeholder="Contoh: Sudah dimodifikasi, dll."
          className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 rounded-lg text-gray-300 hover:bg-dark-600 transition disabled:opacity-50">
          Batal
        </button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <input {...props} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
  </div>
);
