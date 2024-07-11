"use client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // queries: {
          //   staleTime: 6 * 1000,
          //   refetchInterval: 6 * 1000,
          // },
        },
      })
  );
  return isClient ? (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  ) : (
    <></>
  );
};

export default Provider;
