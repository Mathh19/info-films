import { useUrlParams } from "../hooks/useUrlParams";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export const TrendSelector = () => {
  const { searchParams, setParams } = useUrlParams();
  const trendingParam = searchParams.get("trending") ?? "day";
  const motionDiv = trendingParam === "day" ? -120 : 55;

  const handleTrending = (trending: "day" | "week") => {
    setParams("trending", trending);
  };

  return (
    <div className="relative flex w-full overflow-hidden rounded-full border border-cyan-400">
      <motion.div
        animate={{ x: motionDiv }}
        className="absolute inset-0 w-full rounded-full bg-cyan-400"
      />
      <button
        onClick={() => handleTrending("day")}
        className={cn(
          "z-[1] w-full rounded-l-full px-2.5 py-1 font-semibold",
          trendingParam === "day" && "text-background",
        )}
      >
        Hoje
      </button>
      <button
        onClick={() => handleTrending("week")}
        className={cn(
          "z-[1] w-full text-nowrap rounded-r-full px-2.5 py-1 font-semibold",
          trendingParam === "week" && "text-background",
        )}
      >
        Nesta semana
      </button>
    </div>
  );
};
