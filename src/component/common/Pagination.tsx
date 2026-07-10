interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <div className="flex min-w-24 items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg">
        {page} / {totalPages}
      </div>

      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
