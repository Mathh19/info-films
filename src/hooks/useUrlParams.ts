import { useSearchParams } from "react-router-dom";

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = (name: string, value: string) => {
    setSearchParams((state) => {
      state.set(name, value);
      return state;
    });
  }

  const filterParams = (params: string[]) => {
    params.map((param) => {
      searchParams.delete(param);
    });
    return searchParams.toString();
  }

  return { searchParams, filterParams, setParams }
}
