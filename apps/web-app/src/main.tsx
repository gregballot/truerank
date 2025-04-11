import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import {
  preloadLatestDDragonVersion,
  preloadItemData,
  preloadChampionData,
  preloadSummonerSpellData,
  preloadRuneData,
} from './helpers/datadragon';

const queryClient = new QueryClient();

async function start() {
  await preloadLatestDDragonVersion();

  await Promise.all([
    preloadItemData(),
    preloadChampionData(),
    preloadSummonerSpellData(),
    preloadRuneData(),
  ]);

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

start();
