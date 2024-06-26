import { useEffect, useState } from "react";
import { useUrlParams } from "./useUrlParams";

export const usePageParam = () => {
  const { searchParams } = useUrlParams();
  const pageNumber = searchParams.get("page") ?? "1";
  const [page, setPage] = useState('1');

  useEffect(() => {
    if (!/^[0-9]+$/.test(pageNumber)) return setPage('1');
    setPage(pageNumber);
  }, [pageNumber]);

  return { pageParam: page }
}
