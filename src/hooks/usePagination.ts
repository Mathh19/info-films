import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (pageLimit?: number) => {
  const [pageParams, setPageParams] = useSearchParams();
  const pageNumber = pageParams.get("page") ?? "1";
  const [page, setPage] = useState('1');

  useEffect(() => {
    if (!/^[0-9]+$/.test(pageNumber)) return setPage('1');
    if (pageLimit && Number(pageNumber) > pageLimit) {
      setPageParams((state) => {
        state.set('page', pageLimit.toString());

        return state
      });
      setPage(pageLimit.toString());
      return
    };
    setPage(pageNumber);
  }, [pageNumber]);

  return { page, setPageParams }
}
