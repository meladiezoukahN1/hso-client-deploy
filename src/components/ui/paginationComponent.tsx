import React from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const delta = 1;

    pages.push(1);

    // Changed these to const since they're not reassigned
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Rest of the component remains the same
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <Button
        className="text-secondary hover:text-white hover:bg-secondary-600 border border-secondary"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaArrowRight />
      </Button>

      {generatePageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === "number" ? (
            <Button
              className={`hover:bg-secondary-600 hover:text-white border border-secondary ${
                currentPage === page
                  ? "bg-secondary text-white"
                  : "text-secondary"
              } `}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ) : (
            <span className="px-2 py-1">...</span>
          )}
        </React.Fragment>
      ))}

      <Button
        disabled={currentPage === totalPages}
        className="text-secondary hover:text-white hover:bg-secondary-600 border border-secondary"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FaArrowLeft />
      </Button>
    </div>
  );
};

export default PaginationComponent;
