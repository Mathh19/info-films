const urlOriginalImg = import.meta.env.VITE_ORIGINAL_SIZE_IMG;

type InfoProps = {
  children: React.ReactElement;
  backgroundImage: string | null;
};

export const Info = ({ children, backgroundImage }: InfoProps) => {
  return (
    <div className="relative p-4 after:absolute after:inset-0 after:bg-gradient-to-r after:from-background after:via-background after:via-[32%] after:to-transparent after:content-['']">
      {backgroundImage && (
        <div
          style={{
            backgroundImage: `url(${urlOriginalImg}/${backgroundImage})`,
          }}
          className="absolute inset-0 bg-cover bg-center opacity-90"
        ></div>
      )}

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
