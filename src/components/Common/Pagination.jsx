import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) {
  //   if (totalPages <= 1) return null;

  const goto = (page) => {
    const p = Math.max(1, Math.min(totalPages, page));
    if (p !== currentPage) onPageChange(p);
  };

  return (
    <div className={`flex items-center justify-center gap-2 py-2 ${className}`}>
      <button
        onClick={() => goto(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        // Show first 3 pages, last 3 pages, and current page with context
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === page
                  ? "border-[#009FF2] border text-[#009FF2]"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
              {page}
            </button>
          );
        } else if (page === 2 || page === totalPages - 1) {
          return (
            <span key={page} className="text-gray-500">
              ...
            </span>
          );
        }
        return null;
      })}
      <button
        onClick={() => goto(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
