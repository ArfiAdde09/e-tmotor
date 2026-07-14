import { useState } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const initialData = [
  { id: 1, nama: 'Oli Mesin', stok: 50, harga: 45000 },
  { id: 2, nama: 'Kampas Rem', stok: 30, harga: 35000 },
];

export default function ManajemenSparepart() {
  const [spareparts, setSpareparts] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleDelete = (id) => {
    setSpareparts(spareparts.filter((item) => item.id !== id));
    toast.success('Sparepart dihapus');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      nama: form.nama.value,
      stok: parseInt(form.stok.value),
      harga: parseInt(form.harga.value),
    };
    if (editItem) {
      setSpareparts(spareparts.map((item) => (item.id === editItem.id ? { ...item, ...data } : item)));
      toast.success('Sparepart diperbarui');
    } else {
      const newItem = { id: Date.now(), ...data };
      setSpareparts([...spareparts, newItem]);
      toast.success('Sparepart ditambahkan');
    }
    setModalOpen(false);
    setEditItem(null);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const headers = ['Nama', 'Stok', 'Harga', 'Aksi'];
  const renderRow = (item) => (
    <tr key={item.id} className="hover:bg-dark-800/50 transition-colors">
      <td className="px-6 py-4 text-white">{item.nama}</td>
      <td className="px-6 py-4">{item.stok}</td>
      <td className="px-6 py-4">Rp {item.harga.toLocaleString()}</td>
      <td className="px-6 py-4 flex space-x-2">
        <button onClick={() => openEdit(item)} className="text-blue-400 hover:text-blue-300"><PencilIcon className="h-5 w-5" /></button>
        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300"><TrashIcon className="h-5 w-5" /></button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Manajemen Sparepart</h2>
        <button onClick={() => { setEditItem(null); setModalOpen(true); }}
          className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition">
          <PlusIcon className="h-5 w-5" />
          <span>Tambah Sparepart</span>
        </button>
      </div>

      <Table headers={headers} data={spareparts} renderRow={renderRow} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Sparepart' : 'Tambah Sparepart'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nama</label>
            <input name="nama" defaultValue={editItem?.nama || ''} required className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Stok</label>
            <input name="stok" type="number" defaultValue={editItem?.stok || ''} required className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Harga</label>
            <input name="harga" type="number" defaultValue={editItem?.harga || ''} required className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-300 hover:text-white transition">Batal</button>
            <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition">Simpan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}