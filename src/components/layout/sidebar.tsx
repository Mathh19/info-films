import { useState } from "react";
import { InputRadio } from "../input-radio";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1
        onClick={() => setOpen(true)}
        className="font-bebas cursor-pointer text-4xl"
      >
        InfoFilms
      </h1>

      <aside
        className={`fixed left-0 top-0 z-10 h-screen border-r border-border-color bg-background px-6 py-4 transition-all duration-300 max-sm:-translate-x-full ${open && "max-sm:-translate-x-0"}`}
      >
        <h1
          onClick={() => setOpen(false)}
          className="font-bebas text-4xl max-sm:cursor-pointer"
        >
          InfoFilms
        </h1>

        <form className="mt-8 flex flex-col">
          <InputRadio text="Movies" name="type-media" id="type-movie" />
          <InputRadio text="TV" name="type-media" id="type-tv" />
        </form>
      </aside>
    </div>
  );
};
