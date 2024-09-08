"use client";

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import React, {useState} from "react";


const ReactQueryProvider = ({children}: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
