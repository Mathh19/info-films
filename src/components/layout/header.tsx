import { Menu, Search } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar-context";

export const Header = () => {
  const { setIsOpen } = useContext(SidebarContext);

  return (
    <header className="flex w-full items-center justify-end gap-4 border-b border-border-color p-4 max-sm:justify-between">
      <button
        onClick={setIsOpen}
        className="rounded bg-background-secondary px-1.5 py-1 sm:hidden"
      >
        <Menu />
      </button>

      <form className="flex w-full max-w-80 items-center gap-4 rounded-full bg-background-secondary px-4 py-2 outline outline-0 outline-border-color focus-within:outline-1 hover:outline-1">
        <button>
          <Search />
        </button>

        <input
          type="search"
          placeholder="buscar filmes..."
          className="w-full bg-transparent text-lg outline-none"
        />
      </form>
    </header>
  );
};
