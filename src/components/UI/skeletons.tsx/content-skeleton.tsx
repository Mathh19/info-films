import { CardSkeleton } from "./card-skeleton";

export const ContentSkeleton = () => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-6 p-11 max-lg:grid-cols-2 max-md:grid-cols-1">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="w-full max-w-64 space-y-2">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
};
