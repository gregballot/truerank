import clsx from "clsx";
import styles from "./MatchesFiltersBar.module.css";

import { QueueFilter } from '@truerank/shared/routes';

import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

const options: { name: string; filter: QueueFilter }[] = [
  { name: "All", filter: "all" },
  { name: "Ranked Solo/Duo", filter: "ranked-solo" },
  { name: "Ranked Flex", filter: "ranked-flex" },
  { name: "Normal Draft", filter: "normal-draft" },
  { name: "Normal Blind", filter: "normal-blind" },
  { name: "Swiftplay", filter: "swiftplay" },
];

export function MatchesFiltersBar() {
  const defaultParams = useMemo(() => ({ filter: options[0].filter }), []);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("filter")) {
      setSearchParams(defaultParams);
    }
  }, [searchParams]);

  function handleOption(filter: string) {
    if (searchParams.get("filter") !== filter) {
      setSearchParams({ filter });
    }
  }

  return (
    <nav className={styles.matchesFiltersBar}>
      <ul>
        {options.map((option) => (
          <li
            key={option.filter}
            onClick={() => handleOption(option.filter)}
            className={clsx(
              styles.option,
              searchParams.get("filter") === option.filter && styles.active,
            )}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
