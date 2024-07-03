export const CardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="w-full rounded bg-gradient-to-tr from-slate-700 to-slate-800 py-44"></div>
      <div className="h-2 w-full rounded bg-gradient-to-tr from-slate-700 to-slate-800"></div>
      <div className="h-2 w-full max-w-32 rounded bg-gradient-to-tr from-slate-700 to-slate-800"></div>
    </div>
  );
};
