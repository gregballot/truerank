import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import {
  preloadLatestDDragonVersion,
  preloadItemData,
} from './helpers/datadragon';

const queryClient = new QueryClient();

async function bootstrap() {
  await preloadLatestDDragonVersion();
  await preloadItemData();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </React.StrictMode>
  );
}

bootstrap();
