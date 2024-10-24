"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, ReactNode } from "react";

// Create an environment variable or configuration flag
const ENABLE_REACT_QUERY_DEVTOOLS = process.env.NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS === 'true';

export default function QueryProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: Infinity,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{ENABLE_REACT_QUERY_DEVTOOLS && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
