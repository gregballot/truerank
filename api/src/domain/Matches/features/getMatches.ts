export const getMatches = (): {
  id: number;
  date: string;
  result: string;
}[] => {
  return [
    {
      id: 1,
      date: "2025-03-09",
      result: "win",
    },
    {
      id: 2,
      date: "2025-03-10",
      result: "loss",
    },
  ];
};
