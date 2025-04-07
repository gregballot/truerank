import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Home.module.css';
import sharedStyles from '../../styles/shared.module.css';

export function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/player/${username}/EUW`);
  };

  return (
    <div className={clsx(styles.home, sharedStyles.view)}>
      <h1>Truerank</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Game name"
          required
        />
        <button type="submit">Get true rank</button>
      </form>
    </div>
  );
}
