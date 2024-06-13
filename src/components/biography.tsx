export const Biography = ({ biography }: { biography: string }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold">Biografia</h2>
      {biography === "" ? (
        <span className="italic">Sem informações da biografia.</span>
      ) : (
        <p>{biography}</p>
      )}
    </div>
  );
};
