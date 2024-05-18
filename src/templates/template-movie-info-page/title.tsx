type TitleProps = {
  title: string;
  releaseDate: string;
  tagline: string;
};

export const Title = ({ title, tagline, releaseDate }: TitleProps) => {
  return (
    <>
      <h2 className="text-4xl font-bold">
        {title}{" "}
        {releaseDate.length > 0 && <span>({releaseDate.slice(0, 4)})</span>}
      </h2>
      {tagline.length > 0 && (
        <span className="italic text-zinc-500">{tagline}</span>
      )}
    </>
  );
};
