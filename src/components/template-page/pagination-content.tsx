import { Pagination, PaginationItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

type PaginationContentProps = {
  totalPages: number;
  isPlaceholderData: boolean;
};

export const PaginationContent = ({
  totalPages,
  isPlaceholderData,
}: PaginationContentProps) => {
  const { search } = useLocation();
  const [pageParams, setPageParams] = useSearchParams();
  const pageParam = pageParams.get("page") ?? "1";
  const maxPages = totalPages > 40 ? 40 : totalPages;

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    if (!isPlaceholderData) {
      setPageParams((state) => {
        state.set("page", value.toString());

        return state;
      });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [search]);

  return (
    <Pagination
      count={maxPages}
      page={Number(pageParam)}
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
