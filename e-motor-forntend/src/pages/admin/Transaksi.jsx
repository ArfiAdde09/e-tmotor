import Table from '../../components/Table';

const transaksiData = [
  { id: 1, pelanggan: 'Budi', servis: 'Ganti Oli', total: 80000, status: 'Lunas' },
  { id: 2, pelanggan: 'Ani', servis: 'Servis Ringan', total: 120000, status: 'Pending' },
];

export default function Transaksi() {
  const headers = ['ID', 'Pelanggan', 'Servis', 'Total', 'Status'];
  const renderRow = (item) => (
    <tr key={item.id} className="hover:bg-dark-800/50">
      <td className="px-6 py-4">#{item.id}</td>
      <td className="px-6 py-4 text-white">{item.pelanggan}</td>
      <td className="px-6 py-4">{item.servis}</td>
      <td className="px-6 py-4">Rp {item.total.toLocaleString()}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Lunas' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
          {item.status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Transaksi</h2>
      <Table headers={headers} data={transaksiData} renderRow={renderRow} />
    </div>
  );
}