export default function TableRowNotFound({ cols }) {
  return (
    <tr>
      <td className="table-cell border-b" colSpan={cols}>
        <div className="w-full h-[120px] flex items-center justify-center">
          <p className="text-lg text-Gray-500 font-medium ">No data found</p>
        </div>
      </td>
    </tr>
  );
}
