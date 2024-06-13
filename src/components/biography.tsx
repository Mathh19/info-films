import { NoInfoMessage } from "./UI/no-info-message";

export const Biography = ({ biography }: { biography: string }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold">Biografia</h2>
      {biography === "" ? <NoInfoMessage /> : <p>{biography}</p>}
    </div>
  );
};
