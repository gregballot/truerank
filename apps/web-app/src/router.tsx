import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './views/Home/Home';
import { SummonerProfile } from './views/SummonerProfile/SummonerProfile';

import { MainLayout } from './components/MainLayout/MainLayout';

const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/summoners/:playerName/:playerTag', element: <SummonerProfile /> },
      ]
    }
  ])

export function AppRouter() {
  return <RouterProvider router={router} />
}
