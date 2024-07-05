import { cn } from "../../../utils/cn";

export const PersonPageSkeleton = () => {
  return (
    <div>
      <div className="grid animate-pulse grid-cols-[1fr,2fr] gap-4 p-4 max-md:grid-cols-1">
        <div className="space-y-4">
          <div className="h-96 rounded bg-slate-700"></div>

          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 max-w-[80%] rounded bg-slate-700"></div>
                <div className="h-2 max-w-[40%] rounded bg-slate-700"></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 h-8 max-w-[50%] rounded bg-slate-700"></div>

          <div className="space-y-1.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-3 w-full rounded bg-slate-700",
                  index === 4 && "max-w-[85%]",
                )}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
