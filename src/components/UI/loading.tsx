export const Loading = () => {
  return (
    <div className="m-10">
      <div className="relative flex items-center justify-center">
        <div className="animate-loading absolute size-10 rounded-full border-2 border-cyan-400"></div>
        <div className="absolute size-10 animate-[loading_2s_infinite] rounded-full border-2 border-cyan-400"></div>
        <div className="absolute size-10 animate-[loading_3s_infinite] rounded-full border-2 border-cyan-400"></div>
      </div>
    </div>
  );
};
