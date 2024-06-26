import { Pagination } from "../../components/UI/pagination/pagination";
import { usePageParam } from "../../hooks/usePageParam";

type PaginationContentProps = {
  totalPages: number;
  isPlaceholderData: boolean;
};

export const PaginationContent = ({
  totalPages,
  isPlaceholderData,
}: PaginationContentProps) => {
  const { pageParam } = usePageParam();

  return (
    <Pagination
      currentPage={Number(pageParam)}
      totalPages={totalPages}
      isPlaceHolderData={isPlaceholderData}
    />
  );
};
