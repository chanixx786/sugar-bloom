"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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
    <div className={cn("flex items-center justify-between w-full", className)}>
      <Pagination className="justify-end">
        <PaginationContent className="gap-1">
          {/* Previous */}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "size-8 rounded-lg border-border/60 cursor-pointer",
                currentPage === 1 && "pointer-events-none opacity-40"
              )}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
          </PaginationItem>

          {/* Page numbers */}
          {pages.map((page, idx) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="size-8" />
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
                  className={cn(
                    "size-8 rounded-lg font-semibold text-sm cursor-pointer transition-all",
                    page === currentPage
                      ? "bg-gradient-to-r from-[#d44876] to-[#f6bc9c] text-white border-0 shadow-sm hover:opacity-90"
                      : "border-border/60 hover:bg-muted/60"
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next */}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "size-8 rounded-lg border-border/60 cursor-pointer",
                currentPage === totalPages && "pointer-events-none opacity-40"
              )}
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}