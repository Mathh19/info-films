import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SidebarProvider } from "./contexts/sidebar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StyledEngineProvider } from "@mui/material/styles";
import { routers } from "./routers";

const router = createBrowserRouter(routers);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>,
);
