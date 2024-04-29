import { Star, StarHalf } from "lucide-react";

type RatingProps = {
  vote_average: number;
  vote_count: number;
};

export const Rating = ({ vote_average, vote_count }: RatingProps) => {
  const maxStars = 5;
  const filledStars = Math.floor(vote_average / 2);
  const hasHalfStar = vote_average % 2 !== 0;

  const ratingStars = Array.from({ length: maxStars }, (_, index) => {
    // const num = index + 0.5;
    // return (
    //   <span key={index} className="px-[2px]">
    //     {vote_average >= index + 1 ? (
    //       <Star size={15} className="fill-cyan-400 text-cyan-400" />
    //     ) : vote_average >= num ? (
    //       <StarHalf size={15} className="fill-red-400" />
    //     ) : (
    //       <Star size={15} className="text-zinc-400" />
    //     )}
    //   </span>
    // );
    if (index < filledStars) {
      return (
        <span key={index} className="px-[2px]">
          <Star size={15} className="fill-cyan-400 text-cyan-400" />
        </span>
      );
    } else if (index === filledStars && hasHalfStar) {
      return (
        <div key={index} className="relative px-[2px]">
          <Star size={15} className="absolute text-cyan-400" />
          <StarHalf size={15} className="fill-cyan-400 text-cyan-400" />
        </div>
      );
    } else {
      return (
        <span key={index} className="px-[2px]">
          <Star size={15} className="text-zinc-400" />
        </span>
      );
    }
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{ratingStars}</div>
      {vote_count && (
        <span className="text-xs text-white/40">({vote_count})</span>
      )}
    </div>
  );
};
