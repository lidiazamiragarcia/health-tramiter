import React from 'react';
import styles from './table.module.css';

type Column = { key: string; label: string };

type Props = {
  columns: Column[];
  rows: Record<string, any>[];
  renderCell?: (key: string, row: Record<string, any>) => React.ReactNode;
};

export default function Table({ columns, rows, renderCell }: Props) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>
                  {renderCell ? renderCell(c.key, r) : String(r[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
