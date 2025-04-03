import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './views/Home/Home';
import { PlayerProfile } from './views/PlayerProfile/PlayerProfile';

import { MainLayout } from './components/MainLayout/MainLayout';

const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/player/:playerName/:playerTag', element: <PlayerProfile /> },
      ]
    }
  ])

export function AppRouter() {
  return <RouterProvider router={router} />
}
