import React from 'react';
import './app.css';
import { Main } from './components/main/main.page';
import { QueryProvider } from './domain/query-provider/query-provider.component';

export const App = () => {
    return (
        <QueryProvider>
            <Main />
        </QueryProvider>
    );
};
