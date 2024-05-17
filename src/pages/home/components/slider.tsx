import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useUrlParams } from "../../../hooks/useUrlParams";
import { Link } from "react-router-dom";

const urlImg = import.meta.env.VITE_ORIGINAL_SIZE_IMG;

type SliderProps = {
  images: {
    id: number;
    title: string;
    backdrop_url: string;
    alt: string;
  }[];
};

export const Slider = ({ images }: SliderProps) => {
  const { searchParams, filterParams } = useUrlParams();
  const movieParams = searchParams.get("media_type") ?? "movie";
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };

  const prevImage = () => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  if (images.length === 0) return <p>loading...</p>;

  return (
    <div className="relative m-auto max-h-[500px] w-full max-w-6xl">
      <Link
        to={{
          pathname: `/${movieParams}/${images[imageIndex].id}`,
          search: filterParams(["trending"]),
        }}
        className="absolute z-10 ml-4 mt-4 text-4xl font-extrabold text-white drop-shadow-md max-sm:text-3xl"
      >
        {images[imageIndex].title}
      </Link>

      <div className="flex overflow-hidden">
        {images.map((image) => (
          <img
            key={image.backdrop_url}
            src={`${urlImg}/${image.backdrop_url}`}
            alt={image.alt}
            style={{
              translate: `${-100 * imageIndex}%`,
            }}
            className="relative size-full max-h-[500px] max-w-6xl flex-shrink-0 flex-grow-0 object-cover opacity-75 transition-all duration-[400ms] ease-in-out"
          />
        ))}
      </div>

      <div className="absolute bottom-0 top-0 flex w-full items-center justify-between px-4">
        <button
          onClick={prevImage}
          aria-label="ver imagem anterior"
          className="flex size-10 items-center justify-center rounded-full bg-white/50 drop-shadow transition-all duration-300 hover:bg-white/100 focus:bg-white/100"
        >
          <ChevronLeft className="stroke-black" />
        </button>
        <button
          onClick={nextImage}
          aria-label="ver próxima imagem"
          className="flex size-10 items-center justify-center rounded-full bg-white/50 drop-shadow transition-all duration-300 hover:bg-white/100 focus:bg-white/100"
        >
          <ChevronRight className="stroke-black" />
        </button>
      </div>

      <div className="absolute bottom-0 left-1/2 mb-2 flex -translate-x-1/2 gap-2 rounded-full bg-white/50 px-2 py-1 drop-shadow">
        {images.map((_, index) => (
          <button
            key={index}
            data-index={imageIndex === index}
            onClick={() => setImageIndex(index)}
            aria-label={`selecionar a imagem na posição ${index}`}
            className="size-4 rounded-full bg-white data-[index='true']:bg-cyan-400"
          ></button>
        ))}
      </div>
    </div>
  );
};
