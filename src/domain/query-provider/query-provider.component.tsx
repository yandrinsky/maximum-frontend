import React, {PropsWithChildren} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 3000,
                retry: false,
            },

        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
