import { Search } from "lucide-react";
import { Sidebar } from "./sidebar";

export const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border-color p-4">
      <Sidebar />

      <form className="bg-background-secondary flex w-full max-w-80 items-center gap-4 rounded-full px-4 py-2 outline outline-0 outline-border-color focus-within:outline-1 hover:outline-1">
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
