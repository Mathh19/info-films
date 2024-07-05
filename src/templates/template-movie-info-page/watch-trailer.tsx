import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { Modal } from "../../components/UI/modal";
import { TrailerResponse } from "../../shared-types/api-responses";

type WatchTrailerProps = {
  trailer?: TrailerResponse;
};

export const WatchTrailer = ({ trailer }: WatchTrailerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {trailer && trailer.results.length > 0 && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 flex items-center justify-center gap-2 whitespace-nowrap rounded bg-cyan-400/80 px-4 py-2.5 font-bold text-background drop-shadow transition-all duration-300 hover:bg-cyan-400"
          >
            <PlayCircle />
            Ver trailler
          </button>
          <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
            <Modal.Content className="relative w-4/5 rounded-md">
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 animate-fadeIn">
                <span className="font-bebas text-5xl">InfoFilms</span>
              </div>
              ,
              <iframe
                src={`https://www.youtube.com/embed/${trailer.results[0].key}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                allowFullScreen={true}
                className="aspect-video w-full rounded-md border-none"
              />
            </Modal.Content>
          </Modal.Root>
        </>
      )}
    </>
  );
};
