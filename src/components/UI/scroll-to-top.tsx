import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      aria-label="ir para o topo da página"
      data-visible={visible}
      onClick={handleGoToTop}
      className="fixed bottom-10 right-3 z-50 rounded-full border border-background bg-white/40 p-1.5 hover:bg-white data-[visible='false']:hidden"
    >
      <ChevronUp size={25} className="text-center text-background" />
    </button>
  );
};
