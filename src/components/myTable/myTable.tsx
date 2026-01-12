import { ReactNode } from "react";
import "./myTable.css";

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (row: T) => ReactNode;
}

interface MyTableProps<T extends { id?: string | number }> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export default function MyTable<T extends { id?: string | number }>({
  columns,
  data,
  onRowClick,
}: MyTableProps<T>) {
  if (columns.length === 0 || data.length === 0) {
    return <div className="myTable-empty">No data to display</div>;
  }

  return (
    <div className="table-div">
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row.id ?? rowIndex}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? "pointer" : "default" }}
          >
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
