import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient();
export const Route = createRootRoute({
  component: () => (
    <div className="antialiased dark">
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </div>
  ),
});
