import { Pagination, PaginationItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent } from "react";
import { usePagination } from "../../hooks/usePagination";

type PaginationContentProps = {
  totalPages: number;
  isPlaceholderData: boolean;
};

export const PaginationContent = ({
  totalPages,
  isPlaceholderData,
}: PaginationContentProps) => {
  const { page, setPageParams } = usePagination(totalPages);
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    if (!isPlaceholderData) {
      setPageParams((state) => {
        state.set("page", value.toString());

        return state;
      });
    }
  };

  return (
    <Pagination
      count={totalPages}
      page={Number(page)}
      className="flex items-center justify-center"
      variant="outlined"
      disabled={isPlaceholderData}
      onChange={handleChange}
      renderItem={(item) => (
        <PaginationItem
          data-selected={item.selected}
          slots={{ previous: ChevronLeft, next: ChevronRight }}
          className="bg-neutral-50 font-bold hover:bg-neutral-500 disabled:bg-neutral-700 data-[selected='true']:bg-neutral-600 data-[selected='true']:hover:bg-neutral-500 data-[selected='true']:disabled:bg-neutral-50 data-[selected='true']:disabled:text-black"
          {...item}
        />
      )}
    />
  );
};
