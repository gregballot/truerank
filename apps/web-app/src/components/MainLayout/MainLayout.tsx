import { Outlet } from 'react-router-dom';
import { LayoutHeader } from './LayoutHeader';
import { LayoutFooter } from './LayoutFooter';

import styles from './MainLayout.module.css';

export function MainLayout() {
  return (
    <div>
      <LayoutHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  )
}