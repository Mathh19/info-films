import { useEffect, useState } from "react";
import { useUrlParams } from "./useUrlParams";

export const usePagination = (pageLimit?: number) => {
  const { searchParams, setParams } = useUrlParams();
  const pageNumber = searchParams.get("page") ?? "1";
  const [page, setPage] = useState('1');

  const setPageParams = (value: string) => {
    setParams('page', value);
  }

  useEffect(() => {
    if (!/^[0-9]+$/.test(pageNumber)) return setPage('1');
    if (pageLimit && Number(pageNumber) > pageLimit) {
      setParams('page', pageLimit.toString());
      setPage(pageLimit.toString());
      return
    };
    setPage(pageNumber);
  }, [pageNumber]);

  return { page, setPageParams }
}
