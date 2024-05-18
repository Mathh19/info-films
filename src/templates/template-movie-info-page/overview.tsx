type OverviewProps = {
  overview: string;
};

export const Overview = ({ overview }: OverviewProps) => {
  return (
    <>
      {overview.length > 0 && (
        <div>
          <h3 className="mt-28 text-3xl font-bold">Sinopse</h3>
          <p className="max-h-64 max-w-2xl overflow-y-auto font-semibold">
            {overview}
          </p>
        </div>
      )}
    </>
  );
};
