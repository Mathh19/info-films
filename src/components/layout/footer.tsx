import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex w-full justify-end border-t border-border-color p-4">
      <a
        href="https://github.com/Mathh19/info-films"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-fit items-center gap-1 rounded-md p-2 transition-all hover:bg-white hover:text-black"
      >
        <Github size={28} />

        <span className="text-xl font-medium">Github</span>
      </a>
    </footer>
  );
};
