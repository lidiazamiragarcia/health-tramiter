'use client';
import React from 'react';
import styles from './pagination.module.css';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  disabled?: boolean;
  pageSizeOptions?: number[];
};

export default function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  disabled = false,
  pageSizeOptions = [5, 10, 20, 50],
}: Props) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className={styles.pagination}>
      <div className={styles.info}>
        {total === 0 ? 'Sin resultados' : `Mostrando ${from}-${to} de ${total}`}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => onPageChange(page - 1)}
          disabled={disabled || page <= 1}
        >
          Anterior
        </button>
        <span className={styles.pageLabel}>
          Página {page} de {totalPages}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => onPageChange(page + 1)}
          disabled={disabled || page >= totalPages}
        >
          Siguiente
        </button>
      </div>

      {onPageSizeChange && (
        <label className={styles.pageSize}>
          Por página
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            disabled={disabled}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
