import { Outlet } from "react-router-dom";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { Sidebar } from "./components/layout/sidebar";
import { ScrollToTop } from "./components/UI/scroll-to-top";

export function App() {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="min-h-svh transition-all sm:pl-52">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
