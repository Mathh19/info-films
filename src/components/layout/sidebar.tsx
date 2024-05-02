import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar-context";
import { InputRadio } from "../input-radio";

export const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);

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

        <form className="mt-8 flex flex-col">
          <InputRadio text="Filmes" name="type-media" id="type-movie" />
          <InputRadio text="TV" name="type-media" id="type-tv" />
        </form>
      </aside>
    </div>
  );
};
