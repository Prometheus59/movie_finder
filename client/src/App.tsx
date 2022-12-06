import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles/App.css";

import Main from "./Main";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  // Load fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Outfit", "Roboto"],
      },
    });
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Main />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
