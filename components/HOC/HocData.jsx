import TableRowLoading from "../UI/TableRowLoading";
import TableRowNotFound from "../UI/TableRowNotFound";

export default function HocData({ loaded, hasData, cols, children }) {
  if (!loaded) {
    return <TableRowLoading cols={cols} />;
  }
  if (!hasData) {
    return <TableRowNotFound cols={cols} />;
  }
  return <>{children}</>;
}
