import { ChangeEvent, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const TrendSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trendingParam = searchParams.get("trending") ?? "day";

  const handleChangeControll = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchParams((state) => {
        state.set("trending", e.target.value);
        return state;
      });
    },
    [setSearchParams],
  );

  return (
    <div className="flex flex-nowrap overflow-hidden rounded-full border border-cyan-400">
      <label htmlFor="day" className="cursor-pointer">
        <input
          type="radio"
          name="selector-content"
          id="day"
          value="day"
          checked={trendingParam === "day"}
          onChange={handleChangeControll}
          className="peer appearance-none"
        />
        <span
          aria-label="hoje"
          className="whitespace-nowrap rounded-full p-1 px-2 text-lg font-bold transition-all duration-300 peer-checked:bg-cyan-400 peer-checked:text-background peer-focus-within:outline peer-focus-within:outline-1 peer-focus-within:outline-white peer-hover:outline peer-hover:outline-1 peer-hover:outline-white max-md:text-base max-[674px]:text-sm"
        >
          Hoje
        </span>
      </label>
      <label htmlFor="week" className="cursor-pointer">
        <input
          type="radio"
          name="selector-content"
          id="week"
          value="week"
          checked={trendingParam === "week"}
          onChange={handleChangeControll}
          className="peer appearance-none"
        />
        <span
          aria-label="nesta semana"
          className="whitespace-nowrap rounded-full p-1 px-2 text-lg font-bold transition-all duration-300 peer-checked:bg-cyan-400 peer-checked:text-background peer-hover:outline peer-hover:outline-1 peer-hover:outline-white peer-focus:outline peer-focus:outline-1 peer-focus:outline-white max-md:text-base max-[674px]:text-sm"
        >
          Nesta semana
        </span>
      </label>
    </div>
  );
};
