import clsx from 'clsx';

import styles from './Home.module.css';
import sharedStyles from '../../styles/shared.module.css';

import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className={clsx(styles.home, sharedStyles.view)}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page.</p>
      <p>
        <Link to="/player/id">Go to Player Profile</Link>
      </p>
    </div>
  );
}