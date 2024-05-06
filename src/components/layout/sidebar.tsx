import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar-context";
import { useSearchParams } from "react-router-dom";

type MediaType = "movie" | "tv";

export const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = searchParams.get("media_type") ?? "movie";

  const handleSelectMediaType = (mediaType: MediaType) => {
    setSearchParams((state) => {
      state.set("media_type", mediaType);

      return state;
    });
  };

  return (
    <div>
      <aside
        data-open={isOpen}
        className="fixed left-0 z-50 h-svh w-52 border-r border-border-color bg-background px-6 py-4 shadow-lg shadow-black transition-all duration-300 max-sm:-translate-x-full max-sm:data-[open='true']:translate-x-0"
      >
        <button
          onClick={setIsOpen}
          className="font-bebas text-4xl max-sm:cursor-pointer sm:pointer-events-none"
        >
          InfoFilms
        </button>

        <div className="mt-8 flex flex-col">
          <button
            onClick={() => handleSelectMediaType("movie")}
            data-media={mediaType}
            className="w-full rounded px-2 py-1 text-start text-lg font-bold hover:bg-background-secondary/70 hover:drop-shadow data-[media='movie']:bg-background-secondary"
          >
            Filmes
          </button>
          <button
            onClick={() => handleSelectMediaType("tv")}
            data-media={mediaType}
            className="w-full rounded px-2 py-1 text-start text-lg font-bold hover:bg-background-secondary/70 hover:drop-shadow data-[media='tv']:bg-background-secondary"
          >
            Séries
          </button>
        </div>
      </aside>
    </div>
  );
};
