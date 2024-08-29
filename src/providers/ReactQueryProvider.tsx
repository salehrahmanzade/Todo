"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from "react";


const ReactQueryProvider = ({ children }:any) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
