export default function Table({ headers, data, renderRow, emptyMessage = "Tidak ada data" }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-dark-600">
      <table className="min-w-full divide-y divide-dark-600">
        <thead className="bg-dark-800">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-dark-900 divide-y divide-dark-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-10 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => renderRow(item, index))
          )}
        </tbody>
      </table>
    </div>
  );
}