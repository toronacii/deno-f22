import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EngineProvider } from "./engine/engine_context.tsx";
import { AppShell } from "./components/layout/AppShell.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EngineProvider>
        <AppShell />
      </EngineProvider>
    </QueryClientProvider>
  );
}
