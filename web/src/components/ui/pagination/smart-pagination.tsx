"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination/pagination";
import { cn } from "@/lib/utils";

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many pages to show around current page (default: 1)
  className?: string;
}

// Generates the page number array with "ellipsis" markers
function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const delta = siblingCount + 2; // siblings + first + last

  const range: number[] = [];
  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  const pages: (number | "ellipsis")[] = [];

  // Always show page 1
  pages.push(1);

  // Left ellipsis
  if (left > 2) pages.push("ellipsis");

  // Middle range
  pages.push(...range);

  // Right ellipsis
  if (right < totalPages - 1) pages.push("ellipsis");

  // Always show last page
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: SmartPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <div className={cn("flex justify-end w-full", className)}>
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={cn(
                "cursor-pointer",
                currentPage === 1 &&
                  "pointer-events-none opacity-50 bg-transparent text-gray-400"
              )}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pages.map((page, idx) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  className="cursor-pointer font-semibold rounded-xl"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={cn(
                "cursor-pointer",
                currentPage === totalPages &&
                  "pointer-events-none opacity-50 bg-transparent text-gray-400"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}