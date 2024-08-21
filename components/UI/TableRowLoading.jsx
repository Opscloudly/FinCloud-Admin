export default function TableRowLoading({ cols }) {
  return (
    <tr>
      <td className="table-cell border-b bg-white" colSpan={cols}>
        <div className="w-full h-[120px] flex items-center justify-center">
          <p className="text-lg text-Gray-500 font-medium animate-pulse">
            Loading..
          </p>
        </div>
      </td>
    </tr>
  );
}
