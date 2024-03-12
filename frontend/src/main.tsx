import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";

// Create a new instance of QueryClient with default options
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Disable retrying queries
            retry: 0,
        },
    },
});

// Render the root component
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* 
            Wrapping App component with QueryClientProvider to provide access to React Query hooks
        */}
        <QueryClientProvider client={queryClient}>
            {/* 
                Wrapping App component with AppContextProvider to provide access to Global State 
            */}
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
