import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar-context";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { useUrlParams } from "../../hooks/useUrlParams";
import { CategoryContainer } from "../category-container";
import { cn } from "../../utils/cn";

type MediaType = "movie" | "tv";

export const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = searchParams.get("media_type") ?? "movie";
  const { filterParams } = useUrlParams();
  const navigate = useNavigate();

  const handleSelectMediaType = (mediaType: MediaType) => {
    setSearchParams((state) => {
      state.delete("page");
      state.set("media_type", mediaType);

      return state;
    });
  };

  const navigateToHome = () => {
    navigate({ pathname: "/", search: filterParams(["page", "q"]) });
    setIsOpen();
  };

  return (
    <div>
      <div
        onClick={setIsOpen}
        className={cn(
          "fixed inset-0 z-40 cursor-pointer bg-black/40 sm:hidden",
          !isOpen && "hidden",
        )}
      ></div>

      <aside
        className={cn(
          "fixed left-0 z-50 h-screen w-56 border-r border-border-color bg-background px-6 py-4 shadow-lg shadow-black transition-all duration-300 max-sm:-translate-x-full ",
          isOpen && "max-sm:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            to={{ pathname: "/", search: filterParams(["page", "q"]) }}
            aria-label="voltar para página de incial"
            className="font-bebas text-4xl max-sm:hidden max-sm:cursor-pointer"
          >
            InfoFilms
          </Link>

          <button
            onClick={navigateToHome}
            aria-label="voltar para página de incial"
            className="font-bebas text-4xl sm:hidden"
          >
            InfoFilms
          </button>

          <button
            onClick={setIsOpen}
            aria-label="fechar barra de menu lateral"
            className="rounded bg-background-secondary px-1.5 py-1 sm:hidden"
          >
            <X />
          </button>
        </div>

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

        <CategoryContainer />
      </aside>
    </div>
  );
};
