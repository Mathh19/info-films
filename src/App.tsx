import { Outlet } from "react-router-dom";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { Sidebar } from "./components/layout/sidebar";

export function App() {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="sm:pl-52">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
