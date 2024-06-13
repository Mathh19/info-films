import { NoInfoMessage } from "../../components/UI/no-info-message";

type OverviewProps = {
  overview: string;
};

export const Overview = ({ overview }: OverviewProps) => {
  return (
    <>
      <h3 className="mt-28 text-3xl font-bold">Sinopse</h3>
      {overview.length > 0 ? (
        <div>
          <p className="max-h-64 max-w-2xl overflow-y-auto font-semibold">
            {overview}
          </p>
        </div>
      ) : (
        <NoInfoMessage />
      )}
    </>
  );
};
