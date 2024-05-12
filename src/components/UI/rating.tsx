import { Star, StarHalf } from "lucide-react";
import { cn } from "../../utils/cn";

type RatingProps = {
  vote_average: number;
  vote_count: number;
  size?: "sm" | "md" | "lg";
};

export const Rating = ({
  vote_average,
  vote_count,
  size = "sm",
}: RatingProps) => {
  const maxStars = 5;
  const filledStars = Math.floor(vote_average / 2);
  const hasHalfStar = vote_average % 2 !== 0;

  const getStarSize = (size: "sm" | "md" | "lg") => {
    const typeSize = {
      sm: 15,
      md: 20,
      lg: 30,
    };

    return typeSize[size];
  };

  const ratingStars = Array.from({ length: maxStars }, (_, index) => {
    if (index < filledStars) {
      return (
        <span key={index} className="px-[2px]">
          <Star
            size={getStarSize(size)}
            className="fill-cyan-400 text-cyan-400"
          />
        </span>
      );
    } else if (index === filledStars && hasHalfStar) {
      return (
        <div key={index} className="relative px-[2px]">
          <Star size={getStarSize(size)} className="absolute text-cyan-400" />
          <StarHalf
            size={getStarSize(size)}
            className="fill-cyan-400 text-cyan-400"
          />
        </div>
      );
    } else {
      return (
        <span key={index} className="px-[2px]">
          <Star size={getStarSize(size)} className="text-zinc-400" />
        </span>
      );
    }
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{ratingStars}</div>
      {vote_count && (
        <span
          className={cn("text-xs text-white/40", {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
          })}
        >
          ({vote_count})
        </span>
      )}
    </div>
  );
};
