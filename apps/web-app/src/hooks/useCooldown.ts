import { useEffect, useState, useCallback } from 'react';

export function useCooldown(cooldownSeconds = 10) {
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = useCallback((seconds = cooldownSeconds) => {
    if (cooldown <= 0) {
      setCooldown(seconds);
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timeout = setTimeout(() => {
      setCooldown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cooldown]);

  return {
    cooldown,
    isCoolingDown: cooldown > 0,
    startCooldown,
  };
}
