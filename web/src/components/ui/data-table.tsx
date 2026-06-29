"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SmartPagination } from "@/components/ui/pagination/smart-pagination";

// Props

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Number of rows per page (default: 8) */
  pageSize?: number;
  /** Message shown when the table has no rows */
  emptyMessage?: string;
}

// Component

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 8,
  emptyMessage = "No results found.",
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = React.useState(0);

  // Reset to first page whenever data changes (e.g. search/filter from parent)
  React.useEffect(() => {
    setPageIndex(0);
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
    },
  });

  const total = data.length;
  const totalPages = table.getPageCount();
  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div className="flex flex-col gap-4">

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden bg-white/70 backdrop-blur-sm shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="bg-muted/30 hover:bg-muted/30 border-b border-border"
              >
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-border/60 transition-colors hover:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs text-muted-foreground shrink-0">
          Showing{" "}
          <span className="font-medium text-foreground">{from}</span>
          {" – "}
          <span className="font-medium text-foreground">{to}</span>
          {" of "}
          <span className="font-medium text-foreground">{total}</span>
          {" items"}
        </p>

        <SmartPagination
          currentPage={pageIndex + 1}
          totalPages={totalPages}
          onPageChange={(page) => setPageIndex(page - 1)}
          siblingCount={1}
        />
      </div>

    </div>
  );
}
