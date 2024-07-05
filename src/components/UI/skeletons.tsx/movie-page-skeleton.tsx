import { cn } from "../../../utils/cn";

export const MoviePageSkeleton = () => {
  return (
    <div className="space-y-16 p-4">
      <div className="flex animate-pulse flex-col justify-around gap-36 rounded bg-slate-800 px-2 py-4">
        <div className="space-y-2">
          <div className="h-5 w-full max-w-[70%] rounded bg-slate-700"></div>
          <div className="h-2 w-full max-w-[40%] rounded bg-slate-700"></div>
          <div className="h-2 w-full max-w-36 rounded bg-slate-700"></div>

          <div className="h-2 w-full max-w-24 rounded bg-slate-700"></div>
          <div className="h-2 w-full max-w-24 rounded bg-slate-700"></div>
        </div>

        <div className="space-y-2">
          <div className="mb-4 h-3 w-full max-w-52 rounded bg-slate-700"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-full max-w-[85%] rounded bg-slate-700",
                index === 4 && "max-w-[50%]",
              )}
            ></div>
          ))}
          <div className="h-10 w-full max-w-40 rounded bg-slate-700"></div>
        </div>
      </div>

      <div className="space-y-20">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full animate-pulse justify-around gap-9 overflow-hidden"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full space-y-2">
                <div className="size-32 rounded-full bg-slate-700"></div>
                <div className="h-5 w-full max-w-32 rounded bg-slate-700"></div>
                <div className="h-2 w-full max-w-20 rounded bg-slate-700"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
