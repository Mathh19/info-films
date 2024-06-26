import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../utils/cn";
import { usePagination } from "./hooks/usePagination";
import { useUrlParams } from "../../../hooks/useUrlParams";

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  isPlaceHolderData?: boolean;
};

export const Pagination = ({
  totalPages,
  currentPage,
  isPlaceHolderData = false,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
  });
  const { setParams } = useUrlParams();

  const handleChangePage = (pageValue: string) => {
    setParams("page", pageValue);
  };

  const onPrev = () => {
    if (currentPage !== 1) {
      const prevPage = currentPage - 1;
      setParams("page", prevPage.toString());
    }
  };

  const onNext = () => {
    if (currentPage !== totalPages) {
      const nextPage = currentPage + 1;
      setParams("page", nextPage.toString());
    }
  };

  return (
    <div>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            className="size-8 rounded bg-cyan-400 text-black duration-300 hover:brightness-50 disabled:opacity-15 disabled:hover:brightness-100"
            aria-label="previous page"
            onClick={onPrev}
            disabled={currentPage === 1 || isPlaceHolderData}
          >
            <ChevronLeft className="m-auto size-5" />
          </button>
        </li>
        {paginationRange?.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span
                data-disabled={isPlaceHolderData}
                className="flex h-6 w-8 cursor-default items-center justify-center rounded bg-cyan-400 text-black data-[disabled='true']:brightness-50"
              >
                {page}
              </span>
            ) : (
              <button
                className={cn(
                  "relative flex size-8 items-center justify-center rounded bg-cyan-400 duration-300 after:absolute after:size-[0%] after:rounded-sm after:bg-black after:transition-all after:duration-200 after:content-[''] hover:brightness-50",
                  currentPage === page && "after:size-[87%]",
                )}
                onClick={() => handleChangePage(page.toString())}
                disabled={currentPage === page || isPlaceHolderData}
              >
                <span
                  className={cn(
                    "relative z-[1] text-black",
                    currentPage === page && "text-white",
                  )}
                >
                  {page}
                </span>
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            className="size-8 rounded bg-cyan-400 text-black duration-300 hover:brightness-50 disabled:opacity-15 disabled:hover:brightness-100"
            onClick={onNext}
            aria-label="next page"
            disabled={currentPage === totalPages || isPlaceHolderData}
          >
            <ChevronRight className="m-auto size-5" />
          </button>
        </li>
      </ul>
    </div>
  );
};
