import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import MotorForm from '../components/MotorForm';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Profil() {
  const { user, updateProfile } = useAuth();

  // State for Profile Form
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  // State for Motor CRUD
  const [motors, setMotors] = useState([]);
  const [loadingMotors, setLoadingMotors] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMotor, setEditingMotor] = useState(null);

  // Sync profile form with user context
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  // Fetch motors on component mount
  const fetchMotors = async () => {
    setLoadingMotors(true);
    try {
      const response = await api.get('/motor?per_page=100');
      setMotors(response.data.data);
    } catch (error) {
      toast.error('Gagal memuat data motor.');
    } finally {
      setLoadingMotors(false);
    }
  };

  useEffect(() => {
    fetchMotors();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile({ name, phone, address });
  };

  // --- Motor CRUD Handlers ---
  const handleOpenModal = (motor = null) => {
    setEditingMotor(motor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMotor(null);
  };

  const handleMotorSubmit = async (formData) => {
    setIsSubmitting(true);
    const toastId = toast.loading(editingMotor ? 'Memperbarui motor...' : 'Menambahkan motor...');
    try {
      if (editingMotor) {
        await api.put(`/motor/${editingMotor.id}`, formData);
      } else {
        await api.post('/motor', formData);
      }
      toast.success('Data motor berhasil disimpan!', { id: toastId });
      fetchMotors();
      handleCloseModal();
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal menyimpan data motor.';
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMotor = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus motor ini?')) {
      const toastId = toast.loading('Menghapus motor...');
      try {
        await api.delete(`/motor/${id}`);
        toast.success('Motor berhasil dihapus.', { id: toastId });
        fetchMotors();
      } catch (error) {
        toast.error('Gagal menghapus motor.', { id: toastId });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Profil Pengguna</h2>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
              {(name || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{name}</p>
              <p className="text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {/* Profile fields remain the same */}
            <div>
                <label className="block text-sm text-gray-400 mb-1">Nama</label>
                <input value={name} onChange={(e) => setName(e.target.value)} 
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-1">Telepon</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="Nomor telepon Anda"
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-1">Alamat</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)}
                rows="3"
                placeholder="Alamat lengkap Anda"
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition">
              Simpan Perubahan Profil
            </button>
          </form>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Data Motor</h2>
            <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition">
                <PlusIcon className="h-5 w-5" />
                <span>Tambah Motor</span>
            </button>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl">
            <ul className="divide-y divide-dark-600">
                {loadingMotors ? (
                    <li className="p-4 text-center text-gray-400">Memuat data motor...</li>
                ) : motors.length === 0 ? (
                    <li className="p-4 text-center text-gray-400">Belum ada data motor.</li>
                ) : (
                    motors.map(motor => (
                        <li key={motor.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white">{motor.merk} {motor.model} ({motor.tahun})</p>
                                <p className="text-sm text-gray-400">{motor.plat_nomor}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleOpenModal(motor)} className="p-2 text-gray-400 hover:text-primary transition"><PencilIcon className="h-5 w-5"/></button>
                                <button onClick={() => handleDeleteMotor(motor.id)} className="p-2 text-gray-400 hover:text-red-500 transition"><TrashIcon className="h-5 w-5"/></button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingMotor ? 'Edit Data Motor' : 'Tambah Motor Baru'}>
        <MotorForm 
            onSubmit={handleMotorSubmit} 
            onCancel={handleCloseModal}
            initialData={editingMotor}
            isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}