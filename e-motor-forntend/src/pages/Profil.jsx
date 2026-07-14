import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profil() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    toast.success('Profil diperbarui');
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Profil</h2>
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{name}</p>
            <p className="text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nama</label>
            <input value={name} onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}