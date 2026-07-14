import Table from '../../components/Table';

const riwayat = [
  { id: 1, jenis: 'Ganti Oli', tanggal: '2024-01-15', status: 'Selesai' },
  { id: 2, jenis: 'Servis Ringan', tanggal: '2024-02-10', status: 'Proses' },
];

export default function RiwayatServis() {
  const headers = ['ID', 'Jenis Servis', 'Tanggal', 'Status'];
  const renderRow = (item) => (
    <tr key={item.id} className="hover:bg-dark-800/50">
      <td className="px-6 py-4">#{item.id}</td>
      <td className="px-6 py-4 text-white">{item.jenis}</td>
      <td className="px-6 py-4">{item.tanggal}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Selesai' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
          {item.status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Riwayat Servis</h2>
      <Table headers={headers} data={riwayat} renderRow={renderRow} />
    </div>
  );
}